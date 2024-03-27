import React,{useState, useEffect} from 'react';
import { TouchableOpacity,StyleSheet,Image} from 'react-native';
import PropTypes from 'prop-types';

const CheckBox = (props) => {
    const [checked, setChecked] = useState(props.isChecked ? props.isChecked:false)
    const [styles, setStyles] = useState(StyleSheet.create())

    useEffect(()=>{
        setStyles({
            width: props.checkBoxSize,
            height: props.checkBoxSize,
            tintColor: props.checkColor,
        })  
        setChecked(props.isChecked)
    },[props.checkColor,props.checkBoxSize,props.isChecked])

    onToggle=()=>{
        setChecked(!checked);
        props.onToggle(checked);
    }

    return (
            <TouchableOpacity onPress={onToggle}>
                { props.squareCheckBox ? 
                    <Image style={styles} source={checked ? require('../../assets/img/checkSquare.png'): require('../../assets/img/square.png')} /> 
                    :
                    <Image style={styles} source={checked ? require('../../assets/img/checkCircle.png'): require('../../assets/img/circle.png')} /> 
                }
            </TouchableOpacity>  
    );
};

CheckBox.propTypes = {
    isChecked: PropTypes.bool,
    checkBoxSize : PropTypes.number,
    checkColor : PropTypes.string,
    squareCheckBox : PropTypes.bool,
    onToggle: PropTypes.func.isRequired,
};

CheckBox.defaultProps = {
    isChecked: false,
    checkBoxSize: 30,
    checkColor: 'navy',
    squareCheckBox: false,
    onToggle: () => {},
};

export default CheckBox;