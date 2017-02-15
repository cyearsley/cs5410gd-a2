console.log("gameLoop.js loaded!");

// Test to see if a string is an integer
function isInteger(string) {
	return /^\+?(0|[1-9]\d*)$/.test(string);
}

// Game Loop OBJECT
//	This object is not the official game loop.
var gameLoop = function (initData) {
	'use strict';
	var me = this;
	this.$eventSelector = $(initData.selector);
	var _data = {
		eventList: [],
		eventUpdateList: [],
		previousTimestamp: 0
	};

	// Initialze the gameloop
	//	This init function begins the gameLoop
	this.init = function (initialTimestamp) {
		_data.previousTimestamp = initialTimestamp;
		window.requestAnimationFrame(_gameLoop);
	};

	// Subscribe an Event to the game loop
	this.subscribeEvent = function (eventData) {
		_data.eventList.push({
			name: eventData.name,
			eventsRemaining: eventData.eventCount,
			intervalRemaining: eventData.interval,
			previousTimestamp: _data.previousTimestamp,
			eventColor: '#'+(Math.random()*0xFFFFFF<<0).toString(16),
			getDefaultInterval: function () {return eventData.interval;}
		});
	};

	// ========================================================= //
	//
	// G A M E   L O O P
	//
	// ========================================================= //
	var _gameLoop = function (currentTimestamp) {

		_data.previousTimestamp = currentTimestamp;

		// Call UPDATE
		_update();

		// Call RENDER
		_render();

		// REQUEST ANIMATION FRAME
		window.requestAnimationFrame(_gameLoop);
	};

	// ========================================================= //
	//
	// U P D A T E
	//
	// ========================================================= //
	var _update = function () {

		// Reset the eventUpdateList, such that we can append new events that need to be rendered
		_data.eventUpdateList = [];

		// Update each event in the _data.eventList
		for (let ii = _data.eventList.length - 1; ii >= 0; ii = ii - 1) {

			// Check if this event has exhausted it's number of fired events
			if (_data.eventList[ii].eventsRemaining <= 0) {
				// because the event is finished... splice the event from the eventsList
				_data.eventList.splice(ii,ii+1);
				continue;
			}

			// If this event's intervalRemaining is <= zero, it needs to be renered!
			else if (_data.eventList[ii].intervalRemaining <= 0) {
				
				// Push this event onto the eventUpdateList to be rendered.
				_data.eventUpdateList.push(_data.eventList[ii]);

				// Reset the intervalRemaining attribute for the event
				_data.eventList[ii].intervalRemaining = _data.eventList[ii].getDefaultInterval();

				// Decrement the number of events this event must fire
				_data.eventList[ii].eventsRemaining--;
			}

			// Update the event
			_data.eventList[ii].intervalRemaining = _data.eventList[ii].intervalRemaining - (_data.previousTimestamp - _data.eventList[ii].previousTimestamp);
			_data.eventList[ii].previousTimestamp = _data.previousTimestamp;
		}
	};

	// ========================================================= //
	//
	// R E N D E R
	//
	// ========================================================= //
	var _render = function () {

		// Render each event in the _data.eventUpdateList
		for (let ii = 0; ii < _data.eventUpdateList.length; ii = ii + 1) {
			me.$eventSelector.append('<div style="color: ' + _data.eventUpdateList[ii].eventColor + '"><h2>Event: ' + _data.eventUpdateList[ii].name + '  (' + (_data.eventUpdateList[ii].eventsRemaining) + ' Remaining)</h2></div');
			me.$eventSelector.scrollTop(me.$eventSelector.prop("scrollHeight"));
		}
	};
};
