export default function ({dispatch}) {
	return next => action => {
		// if the action does not have a payload or if the
		// payload does not have a .then property, we don't
		// care about it, so send it on
		if(!action.payload || !action.payload.then) {
			return next(action);
		}

		// make sure action's promise resolves
		action.payload
			.then(function (response) {
				// create a new action with the old type, but 
				// replace the promise with the response data
				const newAction = {...action, payload: response};
				dispatch(newAction);
			});
	};
}