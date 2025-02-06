import styled from 'styled-components'
import SideNav from '../components/sideNav';
import Navbar from '../components/navbar';
import Users from './users';

const Wrapper = styled.div`
height: calc(100vh - 69px);
overflow-y: hidden;
overflow-x: hidden;
`
const DashboardLayout = () => {
  return (
    <div className="flex items-start w-full h-[100vh]">
       <SideNav/>
        <section className="flex-1 flex flex-col h-[100%] overflow-x-auto">
          <Navbar />
          <Wrapper>
            <Users />
          </Wrapper>
        </section>
    </div>
  );
}

export default DashboardLayout;
