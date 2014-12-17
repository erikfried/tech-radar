var React = require('react');
var RadarList = require('./radarList').RadarList;
var Blips = require('./radarList').Blips;
var constants = require('../../lib/shared/constants');
var angleCalculator = require('../../lib/shared/angleCalculator');

var noData = ['tools', 'platforms', 'languages', 'techniques'].reduce(function (ack, v){
    ack[v] = { adopt: [], trial: [], assess: [], hold: []};
    return ack;
}, {});

function listOfBlips(data) {
    return Object.keys(data).reduce(function (ack, category) {
        var offset = constants.ANGLE_OFFSETS[category];
        return Object.keys(data[category]).reduce(function (ack2, status) {
            return ack.concat(
                data[category][status].map(function (item, ix) {
                    var coords = angleCalculator.coords(offset + item.angle, 5 * item.distance);
                    return {
                        coords: { x: (coords.x + 225), y: (coords.y + 225) },
                        name: item.name,
                        index: ix
                    };
                })
            );

        }, ack);
    }, []);

}
module.exports = React.createClass({
    getInitialState: function() {
        return {data: noData};
    },
    componentDidMount: function() {
        $.ajax({
            url: window.location.origin + '/radar/latest',
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
        var blips = listOfBlips(this.state.data);
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
                        <Blips data={blips} />
                        <text x="400" y="30">Tools</text>
                        <text x="0" y="30">Techniques</text>
                        <text x="0" y="435">Platforms</text>
                        <text x="290" y="435">Languages &amp; Frameworks</text>
                    </svg>
                </div>
                <RadarList data={this.state.data}/>
            </div>
        );
        console.log('BLIPS', blips);
    }
});
