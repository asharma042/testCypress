/*===========================================================================================*/	
/*  Name: Delete_Receipts_From_Case_Number_NEVER_FOR_PRODUCTION.sql									 */
/*  Description: Remove all financials tied to a case			  	                         */
/*                                                                                           */
/*===========================================================================================*/        
/*                  			Instructions                                                 */
/* 												                                             */
/*	Replace LOCNXX with Location Code														 */
/*	Replace CASEIDXX with case numbers 											        	 */
/*-------------------------------------------------------------------------------------------*/         
/*  Chloe Fruchtnicht          11-23-2022 	Initial Creation                      	         */
/*  Buddy 
/*	      Add connect, change LOCNXX to &4 and CASEIDXX to &5
/*===========================================================================================*/        


-- @F:\APPS\ADA\AppsSupport\scripts\Accounting\Delete_Receipts_From_Case_Number_NEVER_FOR_PRODUCTION_TEMPLATE.sql;
set verify off
set feedback on
set serveroutput on size 100000
host IF NOT EXIST C:\SPOOL MD C:\SPOOL
SPOOL C:\SPOOL\changecs.log

connect &1/&2@&3

  
--Get Trans Nos from Receipts. 

Define TempAllTransNos = 'AllTransNo&&6';
Define TempPayTransNos = 'PayTransNo&&6';

host echo &TempAllTransNos;

Drop Table &TempAllTransNos;

Drop Table &TempPayTransNos;

CREATE TABLE &TempAllTransNos
AS
SELECT CBRACCP_TRAN_NO as AllTransNos FROM CBRACCP
WHERE CBRACCP_LOCN_CODE ='&4'
 AND CBRACCP_RECEIPT_NO IN (
    SELECT CBBRCPT_RECEIPT_NO from CBBRCPT
    where CBBRCPT_LOCN_CODE ='&4'
    and (CBBRCPT_RECEIPT_NO IN (
			SELECT DISTINCT CBRACCP_RECEIPT_NO FROM (SELECT * FROM CBRACCP WHERE CBRACCP_TRAN_NO IN (SELECT CBRACCD_TRAN_NO FROM CBRACCD WHERE CBRACCD_CASE_ID = '&5'))
			) or CBBRCPT_ORIG_RCPT IN (
			SELECT DISTINCT CBRACCP_RECEIPT_NO FROM (SELECT * FROM CBRACCP WHERE CBRACCP_TRAN_NO IN (SELECT CBRACCD_TRAN_NO FROM CBRACCD WHERE CBRACCD_CASE_ID = '&5'))
			)
	) -- Also fetches connected void receipts by looking in ORIG_RCPT.
 );
COMMIT;


--Also gets the void transaction numbers if existing. 
INSERT INTO &TempAllTransNos
SELECT CBRADJH_TRAN_NO FROM CBRADJH WHERE CBRADJH_ORIGINAL_TRAN_NO in (
	   Select ALLTRANSNOS from &TempAllTransNos
		);
COMMIT;


CREATE TABLE &TempPayTransNos
AS
Select 
   CBRACCD_TRAN_NO as PayTransNos FROM CBRACCD
WHERE CBRACCD_TRAN_NO in 
(
    SELECT CBRACCP_TRAN_NO FROM CBRACCP
    WHERE CBRACCP_LOCN_CODE = '&4'
     AND CBRACCP_RECEIPT_NO IN (
        SELECT CBBRCPT_RECEIPT_NO from CBBRCPT
        where CBBRCPT_LOCN_CODE ='&4'
        and (CBBRCPT_RECEIPT_NO IN (
			SELECT DISTINCT CBRACCP_RECEIPT_NO FROM (SELECT * FROM CBRACCP WHERE CBRACCP_TRAN_NO IN (SELECT CBRACCD_TRAN_NO FROM CBRACCD WHERE CBRACCD_CASE_ID = '&5'))
			) or CBBRCPT_ORIG_RCPT IN (		
			SELECT DISTINCT CBRACCP_RECEIPT_NO FROM (SELECT * FROM CBRACCP WHERE CBRACCP_TRAN_NO IN (SELECT CBRACCD_TRAN_NO FROM CBRACCD WHERE CBRACCD_CASE_ID = '&5'))		
			)
		)
     )
)
AND (
	-- Limits to Pay Transactions by referencing CTRDETC for DETC Type Indicator
	CBRACCD_DETC_CODE IN (SELECT CTRDETC_CODE FROM CTRDETC WHERE CTRDETC_LOCN_CODE = '&4' AND CTRDETC_TYPE_IND != 'C')
);
COMMIT;


---- BEGIN ACTUAL DELETION OF RECEIPTS ----

--Remove the receipts records from the GL. Records should match no of receipts.
--CARCTGL  -- Remove GL transasction records for Receipts; only Pay Transactions  						 __ Records

DELETE FROM CIMSMGR.CARCTGL A
	where CARCTGL_TRAN_NO IN (
		SELECT CARCTGL_TRAN_NO FROM CARCTGL
		where CARCTGL_TRAN_NO IN (SELECT AllTransNos FROM &TempAllTransNos)
		UNION 
		SELECT CARCTGL_TRAN_NO FROM CARCTGL
		where CARCTGL_TRAN_NO2 IN (SELECT AllTransNos FROM &TempAllTransNos)
		);
COMMIT;


--DISCARD and remove the ADJH for any voided receipts and the PAYS from ACCD. Count varies.
--CBRADJH  -- Remove Adjustment records for VOID          												  ___ Record

DELETE FROM CIMSMGR.CBRADJH
WHERE CBRADJH_ORIGINAL_TRAN_NO  in (
   Select ALLTRANSNOS from &TempAllTransNos
);
COMMIT;

--CBRAPPL  -- Remove Receipt Pay to Cost records            											__ Record
--Only the pay transactions, not CHG_TRAN_NO because other receipts may have paid on said charge. Count varies. 

DELETE FROM CIMSMGR.CBRAPPL
WHERE CBRAPPL_PAY_TRAN_NO IN (Select AllTransNos from &TempAllTransNos);
COMMIT;


--CBBRCPT -- Remove Receipt Header. Should match count of receipts.    									___ Records

DELETE from CIMSMGR.CBBRCPT
where CBBRCPT_LOCN_CODE ='&4'
and CBBRCPT_RECEIPT_NO IN (SELECT DISTINCT CBRACCP_RECEIPT_NO FROM (
		SELECT * FROM CBRACCP WHERE 
		CBRACCP_TRAN_NO IN (SELECT CBRACCD_TRAN_NO FROM CBRACCD WHERE CBRACCD_CASE_ID = '&5') 
		or CBBRCPT_ORIG_RCPT IN (SELECT DISTINCT CBRACCP_RECEIPT_NO FROM (SELECT * FROM CBRACCP WHERE CBRACCP_TRAN_NO IN (SELECT CBRACCD_TRAN_NO FROM CBRACCD WHERE CBRACCD_CASE_ID = '&5')))
		)
	);
COMMIT;

---CABRCAS - Deletes any liabilities/payables made by these receipts. 



DELETE FROM CABRCAS WHERE CABRCAS_LOCN_CODE = '&4' AND CABRCAS_RECEIPT_NO IN 
        (SELECT DISTINCT CBRACCP_RECEIPT_NO FROM 
            (SELECT * FROM CBRACCP WHERE CBRACCP_TRAN_NO IN (
				SELECT CBRACCD_TRAN_NO FROM CBRACCD WHERE CBRACCD_CASE_ID = '&5' AND CBRACCD_LOCN_CODE = '&4'))
        );
COMMIT;

-- CABPYAS - Deletes the link between the payable and the case.

DELETE FROM CABPYAS WHERE CABPYAS_CASE_ID = '&5';
COMMIT;

-- cbrrecp - Deletes any payable reciepient links made in CBRACCD. 

DELETE from cbrrecp where CBRRECP_CASE_ID = '&5';
COMMIT;

--CBRACCP  -- Remove Receipt Detail.  Should be one of the last to go.	                         		 ___ Records


DELETE FROM CIMSMGR.CBRACCP
WHERE CBRACCP_LOCN_CODE ='&4'
 AND CBRACCP_RECEIPT_NO IN (
	SELECT CBBRCPT_RECEIPT_NO from CBBRCPT
    where CBBRCPT_LOCN_CODE ='&4'
    and (
			CBBRCPT_RECEIPT_NO IN (SELECT DISTINCT CBRACCP_RECEIPT_NO FROM (
				SELECT * FROM CBRACCP WHERE CBRACCP_TRAN_NO IN (SELECT CBRACCD_TRAN_NO FROM CBRACCD WHERE CBRACCD_CASE_ID = '&5')))
			OR 
			CBBRCPT_ORIG_RCPT IN (SELECT DISTINCT CBRACCP_RECEIPT_NO FROM (
				SELECT * FROM CBRACCP WHERE CBRACCP_TRAN_NO IN (SELECT CBRACCD_TRAN_NO FROM CBRACCD WHERE CBRACCD_CASE_ID = '&5')))
		)
 );
 COMMIT;
 
 --MISC RECEIPTS----------------------------------------------------------------------------------------------------
 --CBRDTRN
 --Deletes record in debit account tables if debit account is used to pay on a case.
DELETE FROM CBRDTRN WHERE CBRDTRN_TRAN_NO IN (SELECT * FROM &TempAllTransNos);
COMMIT;

--OPEN ITEMS---------------------------------------------------------------------------------------------------------
--CBRDTRN   -- Remove Records from Open Items Table. Nonpay/OI Out adjustments included. Count varies.	___ Record

delete from CIMSMGR.CBRDTRN WHERE CBRDTRN_TRAN_NO IN (SELECT * FROM &TempPayTransNos);
COMMIT;

--CBRCACC
-- Deletes open items account's creation or attachment on case. 

DELETE FROM CBRCACC WHERE CBRCACC_CASE_ID = '&5';
COMMIT;

--CBBDACC
--Deletes open items account's creation on case. 

DELETE FROM CBBDACC where CBBDACC_DESC = '&5';
COMMIT;

--BONDS--------------------------------------------------------------------------------------------------------------

--CBBBREF   -- Remove pay record from Bond History. (Only if Bond Applied Receipt)						___ Record

delete from CIMSMGR.CBBBREF where CBBBREF_ACCD_BRTF_TRAN IN (SELECT * FROM &TempPayTransNos);
COMMIT;

--CCBBOND  -- Remove Bond Record if Receipts created a bond.											__ Record 

DELETE FROM CIMSMGR.CCBBOND WHERE CCBBOND_ID IN (SELECT CCRBCOD_BOND_ID FROM CCRBCOD WHERE CCRBCOD_TRAN_NO IN (SELECT * FROM &TempAllTransNos));
COMMIT;

--BOND_ORIGINAL_INFO  -- Remove Bond Original Information if Receipts created a bond.					__ Record

DELETE FROM DBSMC.BOND_ORIGINAL_INFO WHERE BOND_ID IN (SELECT CCRBCOD_BOND_ID FROM CCRBCOD WHERE CCRBCOD_TRAN_NO IN (SELECT * FROM &TempAllTransNos));
COMMIT;

---CCRBCOD   -- Remove record of Bond Creation
DELETE FROM CCRBCOD WHERE CCRBCOD_TRAN_NO IN (SELECT * FROM &TempPayTransNos);
COMMIT;

--CCRBCOD   -- Remove Record of Bond Creation by Receipts (Only if paying to create a bond) 			___ Record 

DELETE FROM CIMSMGR.CCRBCOD WHERE CCRBCOD_TRAN_NO IN (SELECT * FROM &TempPayTransNos);
COMMIT;

-- Remove from Bond Reference Table so we can remove from ACCD. 

delete from cbbbref where cbbbref_accd_bond_tran in (SELECT * FROM &TempPayTransNos) and cbBbref_accd_brtf_tran IN (SELECT * FROM &TempPayTransNos);
COMMIT;

--PAYABLES---------------------------------------------------------------------------------------------------------

DELETE FROM CABLIAB where CABLIAB_ACCD_FEE_TRAN IN (SELECT CBRACCD_TRAN_NO FROM CBRACCD WHERE CBRACCD_CASE_ID = '&5');
COMMIT;

--COSTS----------------------------------------------------------------------------------------------------------------
--- Delete Case Costs
delete FROM cbbtext WHERE CBBTEXT_TRAN_NO IN (
sELECT CBRACCD_TRAN_NO FROM CBRACCD
WHERE CBRACCD_CASE_ID = '&5');
COMMIT;

select 'delete cbraccd' from dual;
DELETE FROM CBRACCD
WHERE CBRACCD_CASE_ID = '&5';
COMMIT;

Drop Table &TempAllTransNos;

Drop Table &TempPayTransNos;

COMMIT;

set verify on
set feedback on
set serveroutput off
spool off
exit
