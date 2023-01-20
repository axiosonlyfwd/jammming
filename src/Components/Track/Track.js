import React from 'react';
import './Track.css';

export class Track extends React.Component {
    constructor(props) {
        super(props);
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
    }

    renderAction () {
        if (this.props.isRemoval) {
            return (
                <button onClick={this.removeTrack}>
                    -
                </button>
            );
        } else {
            return (
                <button onClick={this.addTrack}>
                    +
                </button>
            );
        }
    }

    addTrack (props) {
        this.props.onAdd(this.props.track);
    }
    
    removeTrack (props) {
        this.props.onRemove(this.props.track);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3><!-- track name will go here --></h3>
                    <p><!-- track artist will go here--> | <!-- track album will go here --></p>
                </div>
                <button className="Track-action"><!-- + or - will go here --></button>
            </div>
        );
    }
}