/* eslint-disable react/jsx-props-no-spreading */
import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import {
    GET_USER,
} from '../../graphql/queries';
import SideNavigation from '../SideNavigation';
import { UserContext } from '../../context/UserContext';
import Loader from '../Loader';
import { AppContext } from '../../context/AppContext';
import Header from '../Header';

const LoaderContainer = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  bottom: 0;
  z-index: 500;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const AdminLayoutContainer = styled.div`
  height: 100vh;
  max-height: 100vh;
  width: 100%;
  overflow:auto;
`;

function AdminLayout({ component: Component, rolesAllowed, ...rest }) {
  const { setApp } = useContext(AppContext);

  const { data, loading, error } = useQuery(GET_USER, {
    fetchPolicy: 'network-only',
  });

  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setApp((app) => ({ ...app, showSideNav: false }));
  }, [setApp]);

  useEffect(() => {
    if (data?.getUser) {
      setUser(data.getUser);
    }
  }, [data, setUser]);

  if (
    loading
    || orgLoading
    || (!data && !data.currentUser && !error)
    || (!user && !error)
  ) {
    return (
      <LoaderContainer>
        <Loader />
      </LoaderContainer>
    );
  }

  if (error) {
    console.error(error);
  }

  const isAuthed = !!localStorage.getItem('YOUR_DOMAIN_AUTH_TOKEN');

  return (
    <Route
      exact
      {...rest}
      render={(matchProps) => (isAuthed ? (
        <AdminLayoutContainer>
          <Header currentOrganisation={orgData.getCurrentOrganization} />
          <SideNavigation />
          <Component {...matchProps} />
        </AdminLayoutContainer>
      ) : (
        <>
          {!isAuthed  ? (
            <Redirect to="/login" />
          ) : null}
        </>
      ))}
    />
  );
}

export default AdminLayout;
