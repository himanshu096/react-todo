import * as React from "react/cjs/react.development";
import App from "../App";


class Clock extends React.Component {

    constructor(props) {
        super(props);
        this.state = {date: new Date(),name:"Himanshu"};
        this.changeName = this.changeName.bind(this);
    }

    componentDidMount() {
        this.timerID = setInterval(
            () => this.tick(),
            1000
        );
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }

    tick() {
        this.setState({
            date: new Date()
        });
    }

    render() {

        const numbers = [2,5,6,7,10];
        return (
            <div>
                <h1>This is {this.state.name}</h1>
                <h2>It is {this.state.date.toLocaleTimeString()}.</h2>

                <button onClick={this.changeName.bind(this,"Sourav")}> Change to Sourav</button>
                <button onClick={this.changeName.bind(this,"Himanshu")}> Change to Himanshu</button>


                <form>
                    <label>
                        Name: <t/>
                        <input type="text" name="name"/>
                        <br/>
                        <br/>
                        <textarea>this is text</textarea>
                    </label>
                </form>
            </div>

        );
    }


    changeName(name){
        this.setState({
           name: name
        });
    }


}

export default Clock;