import React from "react";
import "./SortingVisualizer.css";
import mergesort from "../SortingAlgorithms/mergesort";
import bubblesort from "../SortingAlgorithms/bubblesort";
import {
  AppBar,
  Button,
  styled,
  Toolbar,
  Typography,
  Stack,
} from "@mui/material";

const PRI_COL = "#7cdaff";
const SEC_COL = "#2dc100";
const TRI_COL = "#fa1e1e";
const QUA_COL = 'green';

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
    };
  }

  componentDidMount() {
    this.resetArray();
  }

  resetArray() {
    const array = [];
    for (let i = 0; i < 75; ++i) {
      array.push(randomIntFromInterval(10, 550));
    }
    this.setState({ array });
  }

  mergeSort() {
      var temp = this.state.array;
      var animations = mergesort(temp,0,temp.length-1);
      this.mergesortutil(animations,0);
  }

  bubbleSort() {
      var temp = this.state.array;
      var animations = bubblesort(temp);
      this.bubblesortutil(animations,0);
  }
  
  mergesortutil = (animations,len) => {
      setTimeout(()=>{
        const arraybars = document.getElementsByClassName('array-bar');
        var [a,b,c] = animations[len];
        if(a===0){
          setTimeout(()=>{
            for(let i=b;i<=c;i++){
            arraybars[i].style.backgroundColor = SEC_COL;
            setTimeout(()=>{
              for(let i=b;i<=c;i++){
              arraybars[i].style.backgroundColor = PRI_COL;
              }},0);
            }},0);
        }
        else if(a===1){
          arraybars[b].style.backgroundColor = QUA_COL;
        }
        else if(a===2){
          arraybars[b].style.backgroundColor = QUA_COL;
          arraybars[c].style.backgroundColor = QUA_COL;
        }
        else{
          setTimeout(()=>{
            let legt = c.length;
            arraybars[b].style.backgroundColor = SEC_COL;
            arraybars[b+legt-1].style.backgroundColor = SEC_COL;
            arraybars[b].style.height = c[legt-1];
            for(let i=legt-2;i>=(b);i--){
              arraybars[i+1].style.height = c[i];
            }
            console.log(c);
          },0);
        }
        if(len<animations.length-1){
          this.mergesortutil(animations,len+1);
        }
      },0);
    }

  bubblesortutil(length, animations, prelen) {
    setTimeout(()=>{
        const arraybars = document.getElementsByClassName('array-bar');
        const [a,b,c,d,e] = animations[len];
        if(c===0){
          arraybars[a].style.backgroundColor = SEC_COL;
          arraybars[b].style.backgroundColor = SEC_COL;
        }
        else if(c===1){
          arraybars[a].style.backgroundColor = TRI_COL;
          arraybars[b].style.backgroundColor = TRI_COL;
          arraybars[a].style.height = `${d}px`;
          arraybars[b].style.height = `${e}px`;
        }
        else if(c===2){
          arraybars[a].style.backgroundColor = PRI_COL;
          arraybars[b].style.backgroundColor = PRI_COL;
        }
        if(len<animations.length-1){
          this.bubblesortutil(animations,len+1);
        }
      },0);
  }

  insertionSort() {
    const temp = this.state.array;
    const animations = insertionsort(temp).reverse();
    const length = animations.length - 1;
    this.insertionsortutil(length, animations, length);
  }

  insertionsortutil(length, animations, prelen) {
    setTimeout(() => {
      const arraybars = document.getElementsByClassName("array-bar");
      const [a, b, c, d, e] = animations[length];
      const bar1_style = arraybars[a].style;
      const bar2_style = arraybars[b].style;

      if (c === -1) {
        bar1_style.backgroundColor = SEC_COL;
        bar2_style.backgroundColor = SEC_COL;
      } else if (c === a) {
        bar1_style.backgroundColor = TRI_COL;
        bar2_style.backgroundColor = TRI_COL;
        bar1_style.height = `${d}px`;
        bar2_style.height = `${e}px`;
      } else if (c === -2) {
        bar1_style.backgroundColor = PRI_COL;
        bar2_style.backgroundColor = PRI_COL;
      }
      
      length -= 1;
      if (length >= 0) {
        this.insertionsortutil(length, animations, prelen);
      }
    }, 0);
  }

  render() {
    const array = this.state.array;

    return (
      <div>
        <AppBar position="sticky" color="secondary">
          <StyledToolbar>
            <Typography variant="h6">Sorting Visualizer</Typography>
            <Stack direction="row" spacing={2}>
              <Button
                onClick={() => this.resetArray()}
                variant="contained"
              >
                ResetArray
              </Button>
              <Button
                onClick={() => this.mergeSort()}
                variant="contained"
              >
                MergeSort
              </Button>
              <Button
                onClick={() => this.bubbleSort()}
                variant='contained'
              >
                BubbleSort
              </Button>
              <Button
                onClick={() => this.insertionSort()}
                variant="contained"
              >
                InsertionSort
              </Button>
            </Stack>
          </StyledToolbar>
        </AppBar>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRI_COL,
                height: `${value}px`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// function AreArraysEqual(inbuilt_sort, app_sort){
//     if(inbuilt_sort.lenght !== app_sort.lenght) return false;
//     for(let i = 0; i < app_sort.lenght; ++i){
//         if(inbuilt_sort[i] !== app_sort[i]) return false;
//     }
//     return true;
// }

export default SortingVisualizer;
