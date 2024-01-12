set verify off
set feedback on
set serveroutput on size 100000
host IF NOT EXIST C:\SPOOL MD C:\SPOOL
SPOOL C:\SPOOL\changecs.log

connect &1/&2@&3

declare

	n_count		number;

	proc_error exception;
	pragma exception_init(proc_error, -20001);

	CURSOR c_sent_rows IS
	   select ccbsent_pidm, ccbsent_vio_no, ccbsent_case_id, ccbsent_sent_code
	   from ccbsent
	   where ccbsent_case_id = miss_pack.case_id; 

	CURSOR c_asmt_rows IS
	   select czrasca_asmt_seq_no
	   from czrasca
	   where czrasca_case_id = miss_pack.case_id;

	CURSOR c_faci_rows IS
	   select czrfaci_seq_no
	   from czrfaci
	   where czrfaci_case_id = miss_pack.case_id;

	CURSOR c_garn IS
	   select cobdreq_case_id from cobdreq
	   where cobdreq_case_id = miss_pack.case_id
	   and cobdreq_id like '%GARN%';

begin

     	miss_pack.case_id		:= '&4'; 

	if miss_pack.case_id is null then
		dbms_output.put_line('*** ALL PARAMETERS ARE MANDATORY. ***');
	else

/*** Insert into BANDEL ***/

        INSERT INTO OSCADBA.BANDEL (BANDEL_TYPE,   
			    BANDEL_CASE_ID,
			    BANDEL_LOCN_CODE,
			    BANDEL_DBA,
			    BANDEL_ACTIVITY_DATE)
        SELECT 'CASE',
               '&4',
               a.CDBCASE_LOCN_CODE,
               UPPER(b.OSUSER),
               SYSDATE
        FROM CDBCASE a,
             V$SESSION b
           WHERE a.CDBCASE_ID = '&4'
        AND b.SID = (SELECT DISTINCT(c.SID) FROM V$MYSTAT c);
		COMMIT;

/*** End Insert ****/
		delete from cwbcatr
    		where cwbcatr_case_id = '&4'; 
		delete from czbroom
    		where czbroom_case_id = '&4';
		delete from czbmile
			where czbmile_case_id = '&4';
		delete from czbmtrk
    		where czbmtrk_case_id = '&4';
		COMMIT;

		cbraccd_proc_case(miss_pack.case_id);

		cabpyas_proc_case(miss_pack.case_id);
		cbrrecp_proc_case(miss_pack.case_id);
		--ccbbond_proc_case(miss_pack.case_id);
		COMMIT;

		DELETE FROM CCRBCOD WHERE CCRBCOD_BOND_ID = (SELECT CCBBOND_ID FROM ccbbond WHERE ccbbond_case_id = miss_pack.case_id);

		DELETE FROM CCRPAYR WHERE CCRPAYR_BOND_ID = (SELECT CCBBOND_ID FROM ccbbond WHERE ccbbond_case_id = miss_pack.case_id);

		Delete	From	ccbbond Where	ccbbond_case_id	= miss_pack.case_id;
		COMMIT;

		ccoctrl_proc_case(miss_pack.case_id);
		--cdrdoct1_proc_case(miss_pack.case_id);
		COMMIT;

		delete From	cdrrelc
		Where	cdrrelc_related_case_id		=	miss_pack.case_id;
		COMMIT;

		--cdrrelc_proc_case(miss_pack.case_id);
		cdraddo_proc_case(miss_pack.case_id);
		cdraedo_proc_case(miss_pack.case_id);
		cdrarst_proc_case(miss_pack.case_id);
		cdrcaus_proc_case(miss_pack.case_id);
		cdbagen_proc_case(miss_pack.case_id);
		COMMIT;

		FOR v_data in c_sent_rows LOOP
		--  hammonbu.cobsite_proc_sent_case(v_data.ccbsent_vio_no, v_data.ccbsent_case_id,
		--	v_data.ccbsent_pidm, v_data.ccbsent_sent_code);

		Delete From  cobsite
		Where    cobsite_type        =    'SENT'
		And    cobsite_xref_id        =    to_char(v_data.ccbsent_pidm)
		And    cobsite_xref_seq        =    v_data.ccbsent_vio_no
		And    cobsite_type_code        =    v_data.ccbsent_sent_code;
		COMMIT;

		czrsesi_proc_case(v_data.ccbsent_pidm, v_data.ccbsent_vio_no);
		COMMIT;
	END LOOP;

		czhfaci_proc_case(miss_pack.case_id);
		czrsent_proc_case(miss_pack.case_id);
		cchsent_proc_case(miss_pack.case_id);
		ccbsent_proc_case(miss_pack.case_id);
		czrctkt_proc_case(miss_pack.case_id);
		czrochg_proc_case(miss_pack.case_id);
		czbcrnc_proc_case(miss_pack.case_id);
		COMMIT;

		delete from cdrdisp
         where cdrdisp_case_id  = '&4';
		COMMIT;

		cdrccpt_proc_case(miss_pack.case_id);
		cdrcomm_proc_case(miss_pack.case_id);
		cdrpass_proc_case(miss_pack.case_id);
		cdrcpty_proc_case(miss_pack.case_id);
		cdrcref_proc_case(miss_pack.case_id);
		ccrecas_proc_case(miss_pack.case_id);
		COMMIT;
		cdrenha_proc_case(miss_pack.case_id);
		cdrissu_proc_case(miss_pack.case_id);
		cdrjaga_proc_case(miss_pack.case_id);
		cdrjfor_proc_case(miss_pack.case_id);
		COMMIT;
		cdrminu_proc_case(miss_pack.case_id);
		cdrplea_proc_case(miss_pack.case_id);
		cdrprls_proc_case(miss_pack.case_id);
		cdrrcol_proc_case(miss_pack.case_id);
		cdrrelc1_proc_case(miss_pack.case_id);
		COMMIT;
		cdrrlsv_proc_case(miss_pack.case_id);
		cdrtaxa_proc_case(miss_pack.case_id);
		cdrtaxl_proc_case(miss_pack.case_id);
		cdrtext_proc_case(miss_pack.case_id);
		COMMIT;		
		ccrctrk_proc_case(miss_pack.case_id);
		cchctrk_proc_case(miss_pack.case_id);
		cdrdass_proc_case(miss_pack.case_id);
		cdrdrel_proc_case(miss_pack.case_id);
		COMMIT;

		clrlhis_proc_case(miss_pack.case_id);
		Delete from czbxfer
			where czbxfer_case_id = '&4';    
		Delete from czrcvol
    		where czrcvol_case_id = '&4';
		COMMIT;

		FOR v_garn in c_garn LOOP

			dbms_output.put_line('*** CASE HAS A GARNISHMENT! CAN NOT DELETE! ***');

		END LOOP;

	Delete from cobdtra
	where cobdtra_dreq_id	in (select cobdreq_id 
						from cobdreq 
						where cobdreq_case_id = '&4');    
	COMMIT;							

	Delete from ccbdrit
	where ccbdrit_dreq_id	in (select cobdreq_id 
						from cobdreq 
    				    where cobdreq_case_id = '&4');
	COMMIT;

	Delete from ccbdrvi
	where ccbdrvi_dreq_id	in (select cobdreq_id 
						from cobdreq 
   						where cobdreq_case_id = '&4');
	COMMIT;
	cobdreq_proc_case(miss_pack.case_id);
	csreprn_proc_case(miss_pack.case_id);
	csrevac_proc_case(miss_pack.case_id);
	cvbtraf_proc_case(miss_pack.case_id);
	csrptyp_proc_case(miss_pack.case_id);
	COMMIT;

	BANINST1.CK_APRE_TRIGGER_CONTROL.CP_SET_APRE;
	delete From	csrcsev
	Where	csrcsev_case_id		=	miss_pack.case_id;
	COMMIT;

	BANINST1.CK_APRE_TRIGGER_CONTROL.CP_UNSET_APRE;

		--csrcsev_proc_case(miss_pack.case_id);

		dbms_output.put_line('CR Doc');
		cdrdoct_proc_case(miss_pack.case_id);
		cobpmsc_proc_case(miss_pack.case_id);
		cobsite_proc_case(miss_pack.case_id);
		COMMIT;
		FOR v_data3 in c_faci_rows LOOP

		  -- czrsstm_proc_case(v_data3.czrfaci_seq_no);
			delete From	czrsstm
			Where	czrsstm_faci_seq_no		=	v_data3.czrfaci_seq_no;
			COMMIT;
		    
			czrcwex_proc_case(v_data3.czrfaci_seq_no);
			COMMIT;
		   
		   --czrcmsw_proc_case(v_data3.czrfaci_seq_no);
			delete   From	czrcmsw
			Where	czrcmsw_faci_seq		=	v_data3.czrfaci_seq_no;
			COMMIT;
		END LOOP;


		delete from DBSMC.SENT_PROG_CONDITIONS
		--where  SENT_PROG_COND_SEQ_NO = v_data3.czrfaci_seq_no
		where SENT_PROG_CASE_ID = miss_pack.case_id;
		COMMIT;

		--czrvict_proc_case(miss_pack.case_id);
		DELETE From	czrvict
		Where	czrvict_case_id			=	miss_pack.case_id;
		COMMIT;

		czrresu_proc_case(miss_pack.case_id);
		czrrest_proc_case(miss_pack.case_id);
		czrtest_proc_case(miss_pack.case_id);
		czbdrug_proc_case(miss_pack.case_id);
		czbcase_proc_case(miss_pack.case_id);
		COMMIT;

        --czrfaci_proc_case(miss_pack.case_id);
		Delete From czrfaci
		Where	czrfaci_case_id		=	miss_pack.case_id;
		COMMIT;

		cltlcas_proc_case(miss_pack.case_id);
		cztlcas_proc_case(miss_pack.case_id);
		COMMIT;

		FOR v_data2 in c_asmt_rows LOOP
		   select count(czrasca_case_id) into n_count from czrasca
		   where czrasca_asmt_seq_no = v_data2.czrasca_asmt_seq_no
		   and czrasca_case_id != miss_pack.case_id;

		   if n_count = 0 then

		      czrqsan_proc_case(v_data2.czrasca_asmt_seq_no);
		      czrasca_proc_case(v_data2.czrasca_asmt_seq_no, miss_pack.case_id);
		      czbasmt_proc_case(v_data2.czrasca_asmt_seq_no);

		   else

		      czrasca_proc_case(v_data2.czrasca_asmt_seq_no, miss_pack.case_id);

		   end if;
			COMMIT;
		END LOOP;

		cbrcacc_proc_case(miss_pack.case_id);
		cdbcase_proc_case(miss_pack.case_id);
		COMMIT;
	end if;

<<FINISH>>
  NULL;
 COMMIT;
 
exception
	When proc_error then
		dbms_output.put_line(sqlerrm);
		rollback;
	When others then
		DBMS_OUTPUT.PUT_LINE ('ERRM:' || SQLERRM);
		dbms_output.put_line('*** THE CASE COULD NOT BE DELETED. PLEASE CONTACT THE OSCA HELP DESK. ***');
		rollback;
end;
/

set verify on
set feedback on
set serveroutput off
spool off
exit
