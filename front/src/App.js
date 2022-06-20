import React from 'react'
import { ToastContainer } from 'react-toastify';
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
                    <h1 className="title">Визуализация городского развития</h1>
                    <nav style={{display: "flex"}}>
                        <div className="header" id="housing" onClick={
                            () => {
                                this.setState({
                                    states: {
                                        demography: false,
                                        housing: true,
                                        communications: false,
                                        accidents: false
                                    }
                                })
                            }}>
                            <span>
                            Жилищный фонд
                            </span>
                        </div>
                        <div className="header" id="accidents" onClick={
                            () => {
                                this.setState({
                                    states: {
                                        demography: false,
                                        housing: false,
                                        communications: false,
                                        accidents: true
                                    }
                                })
                            }}>
                            <span>
                            ДТП
                            </span>
                        </div>
                    </nav>
                </header>
                <Body tabStates={this.state.states}/>
                <ToastContainer/>
            </div>
        );
    }
}


export default (App);
