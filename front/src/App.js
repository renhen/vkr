import React from 'react'
import Body from './Body'

//Отсюда начинается рендер страницы
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            states:   //Состояния активности вкладок
                {demography: true, housing: false, communications: false, accidents: false}
        };
    }


    //При клике на вкладку отображает соотв.
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="title">Сайт статистики аварийного жилья</h1>
                    <nav>
          <span className="header" id="housing" onClick={
              () => {
                  this.setState({states: {demography: false, housing: true, communications: false, accidents: false}})
              }}>Жилье</span>
                        <span className="header" id="accidents" onClick={
                            () => {
                                this.setState({
                                    states: {
                                        demography: false,
                                        housing: false,
                                        communications: false,
                                        accidents: true
                                    }
                                })
                            }}>Аварии</span>
                    </nav>
                </header>
                <Body tabStates={this.state.states}/>
            </div>
        );
    }
}


export default (App);
