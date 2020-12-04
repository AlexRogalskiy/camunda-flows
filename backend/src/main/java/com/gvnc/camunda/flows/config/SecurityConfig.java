package com.gvnc.camunda.flows.config;

import org.keycloak.adapters.springboot.KeycloakSpringBootConfigResolver;
import org.keycloak.adapters.springsecurity.KeycloakConfiguration;
import org.keycloak.adapters.springsecurity.authentication.KeycloakAuthenticationProvider;
import org.keycloak.adapters.springsecurity.config.KeycloakWebSecurityConfigurerAdapter;
import org.keycloak.adapters.springsecurity.filter.KeycloakSecurityContextRequestFilter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.authority.mapping.SimpleAuthorityMapper;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.session.RegisterSessionAuthenticationStrategy;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;
import org.springframework.security.web.servletapi.SecurityContextHolderAwareRequestFilter;

@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends KeycloakWebSecurityConfigurerAdapter {

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        KeycloakAuthenticationProvider keycloakAuthenticationProvider = keycloakAuthenticationProvider();
        keycloakAuthenticationProvider.setGrantedAuthoritiesMapper(new SimpleAuthorityMapper());
        auth.authenticationProvider(keycloakAuthenticationProvider);
    }

    @Bean
    public KeycloakSpringBootConfigResolver KeycloakConfigResolver() {
        return new KeycloakSpringBootConfigResolver();
    }

    @Bean
    protected SessionAuthenticationStrategy sessionAuthenticationStrategy() {
        return new RegisterSessionAuthenticationStrategy(new SessionRegistryImpl());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        super.configure(http);
        http.csrf().disable()
                .authorizeRequests()
                .antMatchers("/backendapi/*").authenticated()
                .antMatchers("/backendapi/**").authenticated()
                .anyRequest().permitAll();
    }

    protected void configureV1(HttpSecurity httpSecurity) throws Exception {

        // this line required to display h2 console only
        httpSecurity.headers().frameOptions().sameOrigin();

        httpSecurity
                .authorizeRequests()
                .anyRequest().permitAll()
                .antMatchers("/backendapi/*").authenticated()
                .antMatchers("/backendapi/**").authenticated();

        // below line required if keycloak is on the same server with the app !!!
        // .antMatchers("/sso/login*").permitAll()
        ;

        //super.configure(httpSecurity);

        // csrf disabled for now because blocking development - enable it after resolving the issue
        //httpSecurity.csrf().requireCsrfProtectionMatcher(this.keycloakCsrfRequestMatcher()).and()
        httpSecurity.csrf().disable()
                .sessionManagement().sessionAuthenticationStrategy(this.sessionAuthenticationStrategy())
                .and()
                .addFilterBefore(this.keycloakPreAuthActionsFilter(), LogoutFilter.class)
                .addFilterBefore(this.keycloakAuthenticationProcessingFilter(), LogoutFilter.class)
                .addFilterAfter(this.keycloakSecurityContextRequestFilter(), SecurityContextHolderAwareRequestFilter.class)
                .addFilterAfter(this.keycloakAuthenticatedActionsRequestFilter(), KeycloakSecurityContextRequestFilter.class)
                .exceptionHandling().authenticationEntryPoint(this.authenticationEntryPoint())
                .and()
                .logout().addLogoutHandler(this.keycloakLogoutHandler()).logoutUrl("/sso/logout").logoutSuccessUrl("/");
    }

    @Override
    public void configure(WebSecurity webSecurity) throws Exception {
        // only activate in dev profile to work with frontend npm port 3000 !!
      //  webSecurity.ignoring().antMatchers("/**/**");
      //  webSecurity.ignoring().antMatchers("/");
      //  webSecurity.ignoring().antMatchers("/**");
    }


}