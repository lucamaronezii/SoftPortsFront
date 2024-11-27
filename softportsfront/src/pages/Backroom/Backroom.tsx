import { Spin } from 'antd';
import { StyledLayout } from './styles';
import { useKeycloak } from '@react-keycloak/web';
import { Navigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { RolesCtx } from '../../context/RolesContext';
import useRoles from '../../hooks/useRoles';

const Backroom = () => {
  const { keycloak, initialized } = useKeycloak();
  const { roles, setRoles } = useContext(RolesCtx);
  const { isIncluding } = useRoles();
  const [rolesLoaded, setRolesLoaded] = useState(false);

  useEffect(() => {
    if (keycloak && initialized) {
      setRoles(keycloak.tokenParsed?.realm_access?.roles || []);
      setRolesLoaded(true);
    }
  }, [keycloak, initialized, setRoles]);

  if (!keycloak.authenticated) {
    return (
      <StyledLayout>
        <Spin size='large' />
      </StyledLayout>
    );
  }

  if (!rolesLoaded) {
    return (
      <StyledLayout>
        <Spin size='large' />
      </StyledLayout>
    );
  }

  if (isIncluding('DESENVOLVEDOR')) {
    return <Navigate to='/projetos' />;
  } else {
    return <Navigate to='/' />;
  }
};

export default Backroom;
