var React = require('react');
/**
 * @jsx React.DOM
 */
var RadarList = React.createClass({
    render: function() {
        var self = this;
        var categoryLists = Object.keys(this.props.data).map(function (category) {
            var data = self.props.data[category];
            return (<CategoryList category={category} data={data}/>);
        });
        return (
            <div className="panel panel-default">
                {categoryLists}
            </div>
        );
    }
});
var Blip = React.createClass({
    getInitialState: function () {
        return {active: false};
    },
    setActive: function () {
        this.setState({active: true});
    },
    setInactive: function () {
        this.setState({active: false});
    },
    render: function () {
        var className = 'blip ' + (this.state.active ? 'blip-is-active' : '');
        var text = {x: this.props.coords.x + 5, y: this.props.coords.y + 5};
        return (
            <g className={className}
                data-target={this.props.name}
                onMouseOver={this.setActive}
                onMouseOut={this.setInactive}>
                <circle className="blipMarker" cx={this.props.coords.x} cy={this.props.coords.y} r="5"/>
                <text className="blipNumber" x={text.x} y={text.y}>{this.props.name}</text>
            </g>
        );
    }
});
var Blips = React.createClass({
    render: function() {
        var markers = this.props.data.map(function (blipdata) {
            console.log('BLIP', blipdata);
            return <Blip coords={blipdata.coords} name={blipdata.name}/>
        })
        return (
            <g>
                {markers}
            </g>
        );
    }
});

var CategoryList = React.createClass({
   render: function () {
       var self = this;
       var listItems = function (list) {
           return list.map(function (item) {
               return (
                   <li className="list-group-item item" data-target={item.name}>
                       <span className="target-name">{item.name}</span>
                       <span className="description"> {item.description}</span>
                       <span className="comment">{item.comment}</span>
                   </li>
               );
           });
       }
       var statusList = Object.keys(self.props.data).map(function (status) {
           var _listItems = listItems(self.props.data[status]);
           return  (
               <ul className="list-group">
                   <li className="list-group-item list-group-item-heading">{status}</li>
                   {_listItems}
               </ul>
               );
       });
       return (
           <div className="panel panel-default">
           <div className="panel-heading">{this.props.category}</div>
           {statusList}
           </div>
       );
   }
});
var RadarListItem = React.createClass({
    getInitialState: function () {
        return {active: false};
    },
    setActive: function () {
        this.setState({active: true});
    },
    setInactive: function () {
        this.setState({active: false});
    },
    render: function () {
        var item = this.props.item;
        var className = 'list-group-item ' + (this.state.active ? 'blip-is-active' : '');
        return (
            <li className={className}>{item.name} onMouseOver={this.setActive} onMouseOut={this.setInactive}
                <span className="description">{item.description}</span>
                <span className="comment">{item.comment}</span>
            </li>
        );
    }
});
var StatusList = React.createClass({
   render: function () {
       var self = this;
       var listItems = function (list) {
           return list.map(function (item) {
               return <RadarListItem item = {item} />;
           });
       }
       var statusList = Object.keys(self.props.data).map(function (status) {
           var _listItems = listItems(self.props.data[status]);
           return  (
               <ul className="list-group">
                   <li className="list-group-item list-group-item-heading">{status}</li>
                   {_listItems}
               </ul>
               );
       });

       return statusList;
   }
});
module.exports = {
    RadarList: RadarList,
    CategoryList: CategoryList,
    StatusList: StatusList,
    Blips: Blips
};
