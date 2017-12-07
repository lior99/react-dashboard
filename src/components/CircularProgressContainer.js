import React, { Component } from 'react';
import CircularProgressbar from 'react-circular-progressbar';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import { setInterval } from 'timers';

class CircularProgressContainer extends Component {
    state = {
        isButtonDisabled: false,
        currentStageIndex: 0,
        percentageArray : [0, 15, 27, 35, 60, 72, 93, 100],
        maxIndex: 7,
    }

    simulateCircularProcess = () => {
        this.setState({
            isButtonDisabled: true,
            currentStageIndex: 0
        })

        const interval = window.setInterval(() => {
            const { percent:currentPercent, currentStageIndex, maxIndex }  = this.state;

            if (currentStageIndex >= maxIndex) {
                window.clearInterval(interval);
                this.setState({
                    isButtonDisabled: false,
                })

                return;
            }

            this.setState({
                currentStageIndex : currentStageIndex + 1
            })
        }, 1000);

    }

    render() {
        const { currentStageIndex, percentageArray } = this.state;

        return (
            <div>
                <div>simulating 5 seconds process with circular progress bar</div>
                <div className="circular-container">
                    <div>
                        <RaisedButton
                            onClick={this.simulateCircularProcess}
                            label="Simulate"
                            primary={true} 
                            disabled={this.state.isButtonDisabled}/>
                    </div>
                    <div>
                        <CircularProgressbar percentage={percentageArray[currentStageIndex]} />
                    </div>
                </div>
            </div>
        );
    }
}

export default CircularProgressContainer;