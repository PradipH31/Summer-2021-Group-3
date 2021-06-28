import React, { useState, useEffect } from 'react'

const defaultImageSrc = "/static/images/paleontology-101.jpg"

const initialFieldValues = {
    classId: '0',
    className: '',
    classDescription: '',
    classOwner: '',
    imageName: '',
    imageSrc: defaultImageSrc,
    imageFile: null
}

function AddClass(props) {
    const [values, setValues] = useState(initialFieldValues)
    const [errors, setErrors] = useState({})
    const { addOrEdit } = props

    const handleInputChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        })
    }

    const showPreview = e => {
        if (e.target.files && e.target.files[0]) {
            let imageFile = e.target.files[0];
            const reader = new FileReader();
            reader.onload = x => {
                setValues({
                    ...values,
                    imageFile,
                    imageSrc: x.target.result
                })
            }
            reader.readAsDataURL(imageFile)
        }
        else {
            setValues({
                ...values,
                imageFile: null,
                imageSrc: defaultImageSrc
            })
        }
    }

    const validate = () => {
        let temp = {}
        temp.className = values.className == "" ? false : true
        temp.imageSrc = values.imageSrc == defaultImageSrc ? false : true
        setErrors(temp);
        return Object.values(temp).every(x => x == true)
    }

    const resetForm = () => {
        setValues(initialFieldValues)
        document.getElementById('image-uploader').value = null;
        setErrors({});
    }

    const handleFormSubmit = e => {
        e.preventDefault();
        if (validate()) {
            const formData = new FormData()
            // formData.append('classId', values.classId)
            formData.append('className', values.className)
            formData.append('classDescription', values.classDescription)
            formData.append('classOwner', values.classOwner)
            formData.append('imageName', values.imageName)
            formData.append('imageFile', values.imageFile)
            addOrEdit(formData, resetForm)
        }
    }


    const applyErrorClass = field => ((field in errors && errors[field] === false) ? ' invalid-field' : '')
    return (
        <>
            <div>
                Add Class
            </div>
            <form autoComplete="off" noValidate
                onSubmit={handleFormSubmit}>
                <div>
                    <img src={values.imageSrc} />
                    <div>
                        <div>
                            <input type="file" accept="image/*" className={"" + applyErrorClass('imageSrc')}
                                onChange={showPreview} id="image-uploader" />
                        </div>
                        <div>
                            <input className={"" + applyErrorClass('className')} placeholder="Class Name" name="className"
                                value={values.className}
                                onChange={handleInputChange} />
                        </div>
                        <div>
                            <input className={"" + applyErrorClass('classDescription')} placeholder="Class Description" name="classDescription"
                                value={values.classDescription}
                                onChange={handleInputChange} />
                        </div>
                        <div>
                            <input className={"" + applyErrorClass('classOwner')} placeholder="Class Owner" name="classOwner"
                                value={values.classOwner}
                                onChange={handleInputChange} />
                        </div>
                        <div>
                            <button type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default AddClass
