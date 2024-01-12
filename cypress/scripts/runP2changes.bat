    @ECHO off
    SET ORACLE_HOME=c:/ada/apps/oracle/product/12.2.0/client_1    
    rem sqlplus /nolog @cypress\scripts\P2changecs.sql  username password connect caseId
    sqlplus /nolog @cypress\scripts\P2changecs.sql  %1 %2 %3 %4
