import React, {Component} from "react";
import './Metronome.css';

import click_1 from './metronome_sounds/1_metronome.wav';
import click_2 from './metronome_sounds/2_metronome.wav';
import can_hi from './metronome_sounds/Perc_Can_lo.wav';
import can_lo from './metronome_sounds/Perc_Can_hi.wav';
import cast_lo from './metronome_sounds/Perc_Castanet_lo.wav';
import cast_hi from './metronome_sounds/Perc_Castanet_hi.wav';
import glass_lo from './metronome_sounds/Perc_Glass_lo.wav';
import glass_hi from './metronome_sounds/Perc_Glass_hi.wav';

import plus_img from './buttons/plus.svg';
import minus_img from './buttons/minus.svg';

import play from './buttons/play.svg';
import pause from './buttons/pause.svg';

import dot_grey from './buttons/dot_grey.svg';
import dot_green from './buttons/dot_green.svg';
import dot_red from './buttons/dot_red.svg';

import bpm_img from './buttons/metronome.svg';

class Metronome extends Component {

//things to add: api for song tempo
//need to work out event handling
//remove count
//beautify drop down menus



    constructor(props){
        super(props);

        this.state ={
            playing:false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: 4,
            selectedTrack1: click_1,
            selectedTrack2: click_2

        };

        
    
    };

    dotsPerMeasure(beatsPerMeasure, count) {
      // Generate an array of dots based on the beat number
      const dots = <img src= {dot_grey} className="dot_grey" alt="dot_grey"></img>;
      const dots_green = <img src= {dot_green} className="dot_grey" alt="dot_grey"></img>;
      const dots_red = <img src= {dot_red} className="dot_grey" alt="dot_grey"></img>;
      const dotsArray = [];
      //add different coloured dots for current beats and first beat
      for (var i = 1; i <= beatsPerMeasure; i += 1){
        
        if(count === 0 && i === 1){
          dotsArray.push(dots_red);
        }
        else if((count+1) === i){
          dotsArray.push(dots_green);
        }
      else{ dotsArray.push(dots);
      }
    }
      //returns this as an array
      return (
        <div>
          {dotsArray}
        </div>
      );
    }

    handleBpmChange = event => {
      const bpm = event.target.value;
      
      if(this.state.playing) {
        // Stop the old timer and start a new one
        clearInterval(this.timer);
        this.timer = setInterval(this.playClick, (60 / bpm) * 1000);
        // Set the new BPM, and reset the beat counter
        this.setState({
          count: this.state.beatsPerMeasure,
          bpm
        });
      } else {
        // Otherwise just update the BPM
        this.setState({ bpm });
      }
      }


      handleBeatsPerMeasureChange = event => {
        const beatsPerMeasure = event.target.value;
        
      
        if(this.state.playing) {
          // Stop the old timer and start a new one
          clearInterval(this.timer);
          this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
          // Set the new BPM, and reset the beat counter
          this.setState({
            count: this.state.beatsPerMeasure,
            beatsPerMeasure
          });
        } else {
          // Otherwise just update the BPM
          this.setState({ beatsPerMeasure });
        }
        }

    playClick = () => {
        const { count, beatsPerMeasure, selectedTrack1,selectedTrack2 } = this.state;
      
          //resets count after 4 are elapsed
          if(count >= (beatsPerMeasure-1)){
                this.setState(state => ({
                    count: 0
                  }))
                  const click2 = new Audio(selectedTrack2);  
                  click2.play();
            }else{
                this.setState(state => ({
                    count: (state.count + 1)
                  }))
                  const click1 = new Audio(selectedTrack1);  
                  click1.play();
            };

      }

      startStop = () => {
        
        if(this.state.playing) {
          // Stop the timer
          clearInterval(this.timer);
          this.setState({
            playing: false
          });
        } else {
          // Start a timer with the current BPM
          this.timer = setInterval(this.playClick, (60 / this.state.bpm) * 1000);
          this.setState({
            count: this.state.beatsPerMeasure,
            playing: true
            // Play a click "immediately" (after setState finishes)
          }, this.playClick);
        }
      }

  
      adjustBPM(x){
        const {bpm} = this.state;
        let temp = parseInt(bpm) + x; //changes BPM by int
        
        if(temp > 240){temp = 240;}
        if(temp < 40){temp = 40;}
        if(this.state.playing) {
          // Stop the old timer and start a new one
          clearInterval(this.timer);
          this.timer = setInterval(this.playClick, (60 / temp) * 1000);
          // Set the new BPM, and reset the beat counter
          this.setState({
            count: this.state.beatsPerMeasure,
            bpm: temp
          });
        } else {
          // Otherwise just update the BPM
          this.setState({ bpm: temp });
        }}

  //change metronome sound
  changeMetronomeSound1(sound){
    this.setState({selectedTrack1: sound})
  }
  //change metronome sound
  changeMetronomeSound2(sound){
    this.setState({selectedTrack2: sound})
  }


 




    render(){
        const {playing, bpm, count, beatsPerMeasure} = this.state;

        return(
            <div className="Metronome">
                <div className="bpm-slider">
                    <div>
                      <img src={bpm_img} className = "bpm_img" alt = "bpm_img"></img>
                    </div>
                    <div>
                    <text className="bpmText">{bpm}</text>
                    <text> bpm</text>
                    </div>


                    
                    <div> {this.dotsPerMeasure(beatsPerMeasure, count )}</div>
                    <img src={minus_img} className = "minus" alt="minus" onClick={() =>this.adjustBPM(-1)}></img>

                    <input type="range"
                            min="40"
                            max="240"
                            value={bpm}
                            onChange={this.handleBpmChange}
                            className="slider"
                     />

                     <img src={plus_img} className = "plus" alt="plus" onClick={() =>this.adjustBPM(1)}></img>
                </div>
             
              <div>
                <input type="image" src={playing ? pause : play} className = "circleButton" onClick = {() => this.startStop()} alt={playing ? "Stop" : "Start"}/>
              </div>

                <div>
    <text>Beats Per Measure: </text>
    <select className="DropDownHeader" value ={beatsPerMeasure} onChange={this.handleBeatsPerMeasureChange}>
    <option value={2}>2</option>
    <option value={3}>3</option>
    <option value={4}>4</option>
    <option value={5}>5</option>
    <option value={6}>6</option>
    <option value={7}>7</option>
    <option value={8}>8</option>
    <option value={9}>9</option>
    <option value={10}>10</option>
    <option value={11}>11</option>
    <option value={12}>12</option>
  </select>
      

    <div>
    <text> Click 1: </text>
<select className="DropDownHeader" onChange={event => this.changeMetronomeSound1(event.target.value)}>
    <option value={click_1}>Default Click 1</option>
    <option value={click_2}>Default Click 2</option>
    <option value={can_hi}>Can Hi</option>
    <option value={can_lo}>Can Lo</option>
    <option value={cast_hi}>Castinets Hi</option>
    <option value={cast_lo}>Castinets Lo</option>
    <option value={glass_hi}>Glass Hi</option>
    <option value={glass_lo}>Glass Lo</option>
  </select>
  <text> Click 2: </text>  
  <select className="DropDownHeader" onChange={event => this.changeMetronomeSound2(event.target.value)}>
    <option value={click_2}>Default Click 2</option>
    <option value={click_1}>Default Click 1</option>
    <option value={can_hi}>Can Hi</option>
    <option value={can_lo}>Can Lo</option>
    <option value={cast_hi}>Castinets Hi</option>
    <option value={cast_lo}>Castinets Lo</option>
    <option value={glass_hi}>Glass Hi</option>
    <option value={glass_lo}>Glass Lo</option>
  </select>
    </div>

</div>
    
            </div>

            
        );
    }
}

export default Metronome;