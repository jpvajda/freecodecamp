class Title extends React.Component{
  render(){
    return(
    <h1>Welcome</h1>
    )
  }
}

class Footer extends React.Component{
  render(){
    return (
    <footer>footer</footer>
    );
  }
}


//-------------------------------------------
class Header extends React.Component{
  render(){
    return (
    <Title /> //uses title component 
    );
  }
}

//---------------------------------
//RULE: components should always be capitalized 
//LAYOUT COMPONENT 
class Layout extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Footer/>
        </div>
    );
  }
}
const app = document.getElementById('app')
ReactDOM.render(<Layout/>,app)
//-----------------------------
//List 
class LayoutList extends React.Component{
  render(){
    var list = [
      <Header/>,
      <Header/>,
      <Header/>,
    ];
    return (
    <u1>
        {list}
        </u1>
    );
  }
}

const appList = document.getElementById('app');
ReactDOM.render(<LayoutList/>, appList)

