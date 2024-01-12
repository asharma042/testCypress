    @ECHO off
    SET ORACLE_HOME=c:/ada/apps/oracle/product/12.2.0/client_1
    rem sqlplus /nolog @cypress\scripts\deleteReceipt.sql username password connect court caseid
    sqlplus /nolog @cypress\scripts\deleteReceipt.sql  %1 %2 %3 %4 %5
    
