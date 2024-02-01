import styled from 'styled-components'
import backgroundImage from '../../Assets/Images/background.png'

export const AuthLayoutWrap = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-image: url('${backgroundImage}');
  min-height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;

  .auth-logo {
    margin-bottom: 40px;
  }
`
