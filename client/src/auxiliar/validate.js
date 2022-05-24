
export default function validate(input){
    let errors= {}
    if(!input.name){
        errors.name = 'Name must be completed'
    }
    else if(!input.heightMin){
        errors.heightMin = 'Field must be completed'
    }
    else if(!input.heightMax){
        errors.heightMax = 'Field must be completed'
    }
    else if(!input.weightMin){
        errors.weightMin = 'Field must be completed'
    }
    else if(!input.weightMax){
        errors.weightMax = 'Field must be completed'
    }
    else if(!input.life_span){
        errors.life_span = 'Field must be completed'
    }
    else if (!/^\d+$/.test(input.heightMin)) {
    errors.heightMin = 'This field only accepts numbers';
}
else if (!/^\d+$/.test(input.heightMax)) {
    errors.heightMax = 'This field only accepts numbers';
}
else if (!/^\d+$/.test(input.weightMin)) {
    errors.weightMin = 'This field only accepts numbers';
}
else if (!/^\d+$/.test(input.weightMax)) {
    errors.weightMax = 'This field only accepts numbers';
}

return errors
}