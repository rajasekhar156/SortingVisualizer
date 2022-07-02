import React from "react";
import "./SortingVisualizer.css";
//import mergesort from "../SortingAlgorithms/mergesort";
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

  mergesort() {}

  bubblesort() {
    const temp = this.state.array;
    const animations = bubblesort(temp).reverse();
    const length = animations.length - 1;
    this.bubblesortutil(length, animations, length);
  }

  bubblesortutil(length, animations, prelen) {
    setTimeout(() => {
      const arraybars = document.getElementsByClassName("array-bar");
      const [a, b, c, d, e] = animations[length];
      const bar1_style = arraybars[a].style;
      const bar2_style = arraybars[b].style;

      if ((prelen - length) % 3 === 0) {
        bar1_style.backgroundColor = SEC_COL;
        bar2_style.backgroundColor = SEC_COL;
      } else if ((prelen - length) % 3 === 1) {
        if (c === a) {
          bar1_style.backgroundColor = TRI_COL;
          bar2_style.backgroundColor = TRI_COL;
          bar1_style.height = `${d}px`;
          bar2_style.height = `${e}px`;
        }
      } else if ((prelen - length) % 3 === 2) {
        bar1_style.backgroundColor = PRI_COL;
        bar2_style.backgroundColor = PRI_COL;
      }

      length -= 1;
      if (length >= 0) {
        this.bubblesortutil(length, animations, prelen);
      }
    }, 100);
  }

  insertionsort() {}

  selectionsort() {}

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
                onClick={() => this.mergesort()}
                variant="contained"
              >
                MergeSort
              </Button>
              <Button
                onClick={() => this.bubblesort()}
                variant='contained'
              >
                BubbleSort
              </Button>
              <Button
                onClick={() => this.insertionsort()}
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
