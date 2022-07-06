import React from 'react'; 
import './SortingVisualizer.css';
import bubblesort from '../SortingAlgorithms/bubblesort';
import insertionsort from '../SortingAlgorithms/insertionsort';
import mergesort from '../SortingAlgorithms/mergesort';
import { AppBar,Button,styled,Toolbar,Typography,Stack } from '@mui/material';

const PRI_COL = "blue";
const SEC_COL = "#2dc100";
const TRI_COL = "#fa1e1e";
const QUA_COL = "#7cdaff";
const BUF_COL = "transparent";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

export default class SortingVisualizer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        array: [],
        bottomarray: [],
      };
    }

    componentDidMount() {
        this.resetArray();
    }
    
    resetArray() {
      const array = [];
      const bottomarray = [];
      for (let i = 0; i < 50; ++i) {
        array.push(randomIntFromInterval(10, 200));
        bottomarray.push(0);
      }
      this.setState({
        array: array,
        bottomarray: bottomarray,
      });
    }

    bubbleSort() {
      var temp = this.state.array;
      var animations = bubblesort(temp);
      this.bubblesortutil(animations,0);
    }

    mergeSort() {
      var temp = this.state.array;
      var animations = mergesort(temp, 0, temp.length - 1);
      this.mergesortutil(animations, 0, 0);
    }

    insertionSort() {
      const temp = this.state.array;
      const animations = insertionsort(temp).reverse();
      const length = animations.length - 1;
      this.insertionsortutil(animations, length);
    }

    mergesortutil = (animations, len, bottomsize) => {
      setTimeout(() => {
        var array = this.state.array;
        var arraybars = document.getElementsByClassName("array-bar");
        var bottomarraybars = document.getElementsByClassName("bottom-array-bar");
        var [a, b, c] = animations[len];
        for (let i = 0; i <= array.length - 1; i++) {
          arraybars[i].style.backgroundColor = QUA_COL;
        }
        if (a === 0) {
          for (let i = b; i <= c; i++) {
            arraybars[i].style.backgroundColor = PRI_COL;
          }
        } else if (a === 1) {
          for (let i = b; i <= c; ++i) {
            arraybars[i].style.backgroundColor = PRI_COL;
          }
        } else if (a === 2) {
          arraybars[b].style.height = 0;
          bottomarraybars[bottomsize].style.height = `${c}px`;
          bottomsize += 1;
        } else if (a === 3) {
          for(let i = 0; i < bottomsize; i++){
            arraybars[i + b].style.height = bottomarraybars[i].style.height;
            bottomarraybars[i].style.height = 0;
          }
          bottomsize = 0;
        }
  
        if (len < animations.length-1) {
          this.mergesortutil(animations, len + 1, bottomsize);
        }
        else{
          for (let i = 0; i <= array.length - 1; i++) {
            arraybars[i].style.backgroundColor = PRI_COL;
          }
        }
      }, 0);
    };
    
    bubblesortutil = (animations,len) => {
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

    insertionsortutil(animations, length) {
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
          this.insertionsortutil(animations, length);
        }
      }, 0);
    }

    render() {
        const array = this.state.array;
        const bottomarray = this.state.bottomarray;
        return (
          <div>
            <AppBar position="sticky" color="secondary">
              <StyledToolbar>
                <Typography variant="h6">Sorting Visualizer</Typography>
                <Stack direction="row" spacing={2}>
                  <Button onClick={() => this.resetArray()} variant="contained">ResetArray</Button>
                  <Button onClick={() => this.bubbleSort()} variant="contained">BubbleSort</Button>
                  <Button onClick={() => this.mergeSort()} variant="contained">MergeSort</Button>
                  <Button onClick={() => this.insertionSort()} variant="contained">InsertionSort</Button>
                </Stack>
              </StyledToolbar>
            </AppBar>
            <div className="array-container">
              {array.map((value, index) => (
                <div className="array-bar" key={index} style={{backgroundColor: PRI_COL,height: `${value}px`}} />
              ))}
            </div>
            <div className="array-bottom-container">
              {bottomarray.map((value, index) => (
                <div className="bottom-array-bar" key={index} style={{backgroundColor: PRI_COL,height: `${value}px`}} />
              ))}
            </div>
          </div>
        );
    }
}

function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}
