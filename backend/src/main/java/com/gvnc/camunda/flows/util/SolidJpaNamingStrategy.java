package com.gvnc.camunda.flows.util;

import org.hibernate.boot.model.naming.Identifier;
import org.hibernate.engine.jdbc.env.spi.JdbcEnvironment;
import org.springframework.boot.orm.jpa.hibernate.SpringPhysicalNamingStrategy;

public class SolidJpaNamingStrategy extends SpringPhysicalNamingStrategy {

    @Override
    public Identifier toPhysicalCatalogName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        Identifier snakeCaseConverted = super.toPhysicalCatalogName(name, jdbcEnvironment);
        if(snakeCaseConverted == null)
            return null;
        return new Identifier(snakeCaseConverted.getText().toUpperCase(), snakeCaseConverted.isQuoted());
    }

    @Override
    public Identifier toPhysicalSchemaName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        Identifier snakeCaseConverted = super.toPhysicalSchemaName(name, jdbcEnvironment);
        if(snakeCaseConverted == null)
            return null;
        return new Identifier(snakeCaseConverted.getText().toUpperCase(), snakeCaseConverted.isQuoted());
    }

    @Override
    public Identifier toPhysicalTableName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        Identifier snakeCaseConverted = super.toPhysicalTableName(name, jdbcEnvironment);
        if(snakeCaseConverted == null)
            return null;
        return new Identifier(snakeCaseConverted.getText().toUpperCase(), snakeCaseConverted.isQuoted());
    }

    @Override
    public Identifier toPhysicalSequenceName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        Identifier snakeCaseConverted = super.toPhysicalSequenceName(name, jdbcEnvironment);
        if(snakeCaseConverted == null)
            return null;
        return new Identifier(snakeCaseConverted.getText().toUpperCase(), snakeCaseConverted.isQuoted());
    }

    @Override
    public Identifier toPhysicalColumnName(Identifier name, JdbcEnvironment jdbcEnvironment) {
        Identifier snakeCaseConverted = super.toPhysicalColumnName(name, jdbcEnvironment);
        if(snakeCaseConverted == null)
            return null;
        return new Identifier(snakeCaseConverted.getText().toUpperCase(), snakeCaseConverted.isQuoted());
    }

    @Override
    protected Identifier getIdentifier(String name, boolean quoted, JdbcEnvironment jdbcEnvironment) {
        Identifier snakeCaseConverted = super.getIdentifier(name, quoted, jdbcEnvironment);
        if(snakeCaseConverted == null)
            return null;
        return new Identifier(snakeCaseConverted.getText().toUpperCase(), snakeCaseConverted.isQuoted());
    }
}
