'use strict';
var foo = require('./foo')();
var React = require('react');
var Radar = require('./radar');

React.render(<Radar/>,
    document.getElementById('radar'));

(function init() {
    $(document).ready(function () {

        $('#radar-select').on('change', function (value) {
            $('#blip-radar').val(value);
        });

        $('.new-target-js').hide();
        $('#blip-form').hide();
        $('.error-feedback-js').hide();
        $('.success-feedback-js').hide();

        (function setUpTypeahead() {
            //Bloodhound is the datasource for typeahead of targets
            var targets = new Bloodhound({
                datumTokenizer: function (datum) {
                    var nameTokens = Bloodhound.tokenizers.whitespace(datum.name);
                    var description = datum.description;
                    //Enable search for description too.
                    var descriptionTokens = (description && description.length > 0 ?  Bloodhound.tokenizers.whitespace(description) : []);
                    return  nameTokens.concat(descriptionTokens);
                },
                queryTokenizer: Bloodhound.tokenizers.whitespace,
                prefetch: {
                    url: '/target/',
                    ttl: 1000,
                    filter: function (a) {
                        console.log('Got', a);
                        return a;
                    }
                }
            });
            targets.initialize();
            var typeahead = $('#targets').typeahead(null, {
                displayKey: 'name',
                source: targets.ttAdapter(),
                highlight: true,
                autoselect: true
            });

            var targetName = null;
            var targetId = null;
            typeahead.on('typeahead:opened',function () {
                //Reset things on open
                targetName = null;
                targetId = null;
                console.log('opened', arguments);
            }).on('typeahead:selected',function (e, o) {
                console.log('ac', arguments);
                targetId = o.id;
                targetName = o.name;
            }).on('typeahead:closed', function () {
                targetName = targetName || $(this).val();
                if (!targetName) {
                    return $(this).focus();
                } else if (!targetId) {
                    $('.new-target-js').show();
                    $('#target-category').focus();
                    return;
                } else if (targetId) {
                    $('.new-target-js').hide();
                    $('#blip-form').show();
                    $('#blip-distance').focus();
                    $('#blip-target').val(targetId);
                }
                console.log('closed', targetId, targetName + '"', arguments);
            });
        }());

        function handleFormSubmit(e) {
            e.preventDefault();
            var target = $(this);
            var url = target.attr('action');
            var method = target.attr('method');
            var inputs = target.find('input,textarea,select');
            var postData = {};
            inputs.filter(function (ix, input) {
                return (input.name && input.name.length > 0);
            }).each(function (ix, input) {
                postData[input.name] = input.value;
            });
            console.log('POST form', url, method);
            var ARGS = {
                url: url,
                method: method,
                data: postData,
                success: function (data, status) {
                    console.log('Saved target', data);
                    target.find('.error-feedback-js').hide();
                    target.find('.success-feedback-js').show(function () {
                        $(this).slideUp();
                    });
                    callbacks[target.attr('id')](data, target, postData);
                },
                error: function (e) {
                    console.log('Failed to save', arguments, postData);
                    target.find('.error-feedback-js').show();
                    target.find('.success-feedback-js').hide();
                    if (e.responseJSON && e.responseJSON.error) {
                        $('.message-js').text(e.responseJSON.error);
                    }

                    $('#targets').focus();
                }
            };
            $.ajax(ARGS);

        }
        var callbacks = {
            'target-form': function (data, target, postData) {
                if (data) $('#blip-target').val(data.id);
                var $blipForm = $('#blip-form');
                $blipForm.find('.target-name').text(postData.name);
                $blipForm.slideDown(function () {
                    target.slideUp('slow');
                });
                $('#blip-distance').focus();
            },
            'blip-form': function () {
                $('input,textarea').each(function (ix, input) {
                    $(input).val('');
                })
                $('#targets').focus();
            }
        };

        $('form').on('submit', handleFormSubmit);

        $('#radar-select').on('change', function setRadarId() {

            $('#blip-radar').val($(this).val());
        });

        $('#blip-distance').on('change', function () {
            var value = $(this).val();
            var status =
                (value > 30 ? 'Hold' :
                    (value > 20 ? 'Assess' :
                        (value > 10 ? 'Trial' :
                            (value >= 0 ? 'Adopt': null))));
            $('#blip-status')
                .text(status);
//                .–addClass(status.toLowerCase());
        });

        //Dunno why, but i need two focuses to get focus...
        $('#targets').focus().focus();


    });
})();



