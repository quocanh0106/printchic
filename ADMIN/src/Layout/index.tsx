import Header from './Component/Header'
import SideBar from './Component/Sidebar'
import { LayoutContainer, SideBarContainer } from './style'

function Layout(props: any) {
  return (
    <LayoutContainer>
      <SideBarContainer>
        <SideBar />
      </SideBarContainer>
      <div
        id='content'
        style={{
          width: 'calc(100% - 200px)'
        }}
      >
        <Header />
        <div style={{ padding: '25px', height: '90%', overflowY: 'scroll' }}>{props.children}</div>
        {/* <Footer /> */}
      </div>
    </LayoutContainer>
  )
}

export default Layout
