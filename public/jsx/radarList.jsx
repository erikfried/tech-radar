var React = require('react');
/**
 * @jsx React.DOM
 */
var categories = ['adopt', 'trial', 'assess', 'hold'];
var RadarList = React.createClass({
    render: function() {
        var self = this;
        var categoryLists = Object.keys(this.props.data).map(function (category) {
            var data = self.props.data[category];
            return (<CategoryList category={category} data={data}/>);
        });
        return (
            <div class="panel panel-default">
                {categoryLists}
            </div>
        );
    }
});
var Blips = React.createClass({
    render: function() {
        return (
            <g>
                <circle className="blip" cx="275" cy="250" r="5" fill="#efefef" stroke="#111" strokeWidth="3"/>
                <text className="blipNumber" x="285" y="255">1.</text>
                <polygon className="blip" points="250,70 260,70 255,60" stroke="#111" fill="#efefef" />
                <text className="blipNumber">2</text>
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
                   <li className="list-group-item">
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
var StatusList = React.createClass({
   render: function () {
       var self = this;
       var listItems = function (list) {
           return list.map(function (item) {
               return (
                   <li class="list-group-item">{item.name}
                       <span className="description">{item.description}</span>
                       <span className="comment">{item.comment}</span>
                   </li>
                   );
           });
       }
       var statusList = Object.keys(self.props.data).map(function (status) {
           var _listItems = listItems(self.props.data[status]);
           return  (
               <ul class="list-group">
                   <li class="list-group-item list-group-item-heading">{status}</li>
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
