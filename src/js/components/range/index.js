/* libs */
import React from 'react';
import { Range, getTrackBackground } from 'react-range';

/* styles */
import md from './styles.module.scss'

class LabeledTwoThumbs extends React.Component {

  state = {
    values: [this.props.min, this.props.max]
  };

  shouldComponentUpdate(nextProps) {
    if (this.props.max != nextProps.max || this.props.min != nextProps.min)
      this.setState({ values: [nextProps.min, nextProps.max] })

    return true
  }

  valuesChanger = (values) => {
    this.setState({ values })
    this.props.rangeChanger(values)
  }

  render() {
    return (
      <div
        className={`${md.range} ${this.props.className}`}
      /* style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%'
      }} */
      >
        <Range
          values={this.state.values}
          step={this.props.step}
          min={this.props.min}
          max={this.props.max > this.props.min ? this.props.max : 10}
          onChange={this.valuesChanger}
          renderTrack={({ props, children }) => (
            <div
              className={md.rageTube}
              onMouseDown={props.onMouseDown}
              onTouchStart={props.onTouchStart}
              style={{
                ...props.style,
                /* height: '36px',
                display: 'flex',
                width: '100%' */
              }}
            >
              <div
                ref={props.ref}
                className={md.rageLine}
                style={{
                  /* height: '5px',
                  width: '100%',
                  borderRadius: '4px', */
                  background: getTrackBackground({
                    values: this.state.values,
                    colors: ['#ccc', '#548BF4', '#ccc'],
                    min: this.props.min,
                    max: this.props.max
                  }),
                  // alignSelf: 'center'
                }}
              >
                {children}
              </div>
            </div>
          )}
          renderThumb={({ index, props, isDragged }) => (
            <div
              className={md.thumb}
              {...props}
              style={{
                ...props.style,
                /* height: '42px',
                width: '42px',
                borderRadius: '4px',
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                boxShadow: '0px 2px 6px #AAA' */
              }}
            >
              <div
                className={md.thumbLabel}
                style={{
                  /* position: 'absolute',
                  top: '-28px',
                  color: '#fff',
                  fontWeight: 'bold',
                  fontSize: '14px',
                  fontFamily: 'Arial,Helvetica Neue,Helvetica,sans-serif',
                  padding: '4px',
                  borderRadius: '4px',
                  backgroundColor: '#548BF4' */
                }}
              >
                {this.state.values[index].toFixed(1)}
              </div>
              <div
                className={md.thumbVertLine}
                style={{
                  /* height: '16px',
                  width: '5px', */
                  backgroundColor: isDragged ? '#548BF4' : '#CCC'
                }}
              />
            </div>
          )}
        />
      </div>
    );
  }
}

export default LabeledTwoThumbs;