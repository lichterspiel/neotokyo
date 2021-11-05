import React, {useCallback} from "react";

export default function ThemeSwitcher(props){
	const handleInput = useCallback(() => {
		onThemeChange()
	},[onThemeChange]);

	return (
		<FormControlLabel control={ 
			<Switch checked={toggleDark} onChange={() => {handleInput}}/>
		}label="Theme"/>
	)
}

