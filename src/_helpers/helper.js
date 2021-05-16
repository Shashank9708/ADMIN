import { utilityHelper } from './utilityHelper';

/**
 * Sets the value of a dropdown based on the target value.
 * @param list
 * @param target
 * @param fallbackIndex
  @returns {}
 */
export const loadSelectedListValue = (list, target, fallbackIndex = 0) => {
    const stringTarget = target ? target.toString() : '';
    const selected = list.filter(i => {
        return i.value.toString() === stringTarget
    });
    return selected[0] || list[fallbackIndex];
}

/**
 * Sets the value of a multiselect based on the target value.
 * @param list
 * @param targetValueString
  @returns {}
 */
export const loadSelectedMultiListValue = (list, targetValueString) => {
    const valueString = targetValueString || '';
    const values = valueString.split(';');

    return list.filter(i => values.includes(i.value));
}


/**
 * TODO  	
 * Create array of object for Dropdown list.
 * its contain label and value, passing Array
 */
export const CreateOptions = (arg) => {
	let options = [];
	for (let i = 0; i < arg.length; i++) {
		options.push({
			label: `${arg[i]}`, value: arg[i]
		});
	}

	return options
}

/**
 * Format field label and value
 * @param string
 * return []/string
 */
export const formatLabelANDValue = (data) => {
	if(data){
		return {label: data, value: data}
	}
	return {}
}


/**
 * TODO  	
 * Create array of object for Dropdown list.
 * its contain label and value, passing Array
 */
export const CreateOptionTime = (arg) => {
	let options = [];
	for (let i = 0; i < arg.length; i++) {
		let label = utilityHelper.formatTime(arg[i])
		options.push({
			label: label, value: arg[i]
		});
	}

	return options
}