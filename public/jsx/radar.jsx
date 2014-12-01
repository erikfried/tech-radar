var React = require('react');
var RadarList = require('./radarList').RadarList;
var Blips = require('./radarList').Blips;

var noData = ['tools', 'platforms', 'languages', 'techniques'].reduce(function (ack, v){
    ack[v] = { adopt: [], trial: [], assess: [], hold: []};
    return ack;
}, {});
module.exports = React.createClass({
    getInitialState: function() {
        return {data: noData};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function () {
        return (
            <div className="radar">
                <div className="svg-container">
                    <svg id="svg-area" viewBox="0 0 450 450" preserveAspectRatio="xMinYMin meet"
                     className="svg-content">
                        <circle cx="225" cy="225" r="200" fill="#efefef" stroke="#aaa"/>
                        <circle cx="225" cy="225" r="150" fill="#dfdfdf" stroke="#aaa"/>
                        <circle cx="225" cy="225" r="100" fill="#cfcfcf" stroke="#aaa"/>
                        <circle cx="225" cy="225" r="50" fill="#bfbfbf" stroke="#aaa"/>
                        <line x1="10" y1="225" x2="440" y2="225"stroke="#aaa" strokeWidth="1"/>
                        <line x1="225" y1="10" x2="225" y2="440" stroke="#aaa" strokeWidth="1"/>
                        <Blips data={this.state.data} />
                    </svg>
                </div>
                <RadarList data={this.state.data}/>
            </div>
        );
    }
});
