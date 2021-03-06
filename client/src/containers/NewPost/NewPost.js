import React, { Component } from 'react';
import classes from './NewPost.css';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Button from '../../components/UI/Button/Button';
import ButtonBootstrap from 'react-bootstrap/Button';
import PropagateLoader from "react-spinners/PropagateLoader";
import { updateObject, checkValidity } from '../../shared/utility';
import Input from '../../components/UI/Input/Input';
import ImageUploading from "react-images-uploading";

const maxNumber = 100;
const maxMbFileSize = 6 * 1024 * 1024;

class NewPost extends Component {

    state = {
        orderForm: {
            przygotowanie: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Przepis'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                startView: true,
                hide: true
            },
            photographs: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Photographs'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                startView: true,
                hide: true
            },
            location: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Location'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                startView: true,
                hide: true
            },
            describeData: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Describe'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                startView: false,
                hide: true
            },
            webAddress: {
                elementType: 'input',
                elementConfig: {
                    type: 'url',
                    placeholder: 'URL'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: true,
                touched: true,
                startView: false,
                hide: true
            },
            textField: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your text'
                }
            },
            skladniki: {
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Składniki'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: true,
                touched: true,
                startView: false,
                hide: true
            },
            year: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Year'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 4,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                startView: true,
                hide: true
            },
            price: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    step: 0.01,
                    placeholder: 'Cena'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 4,
                    step: 0.01,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                startView: true,
                hide: true
            },
        },
        formIsValid: false,
        imgNeme: '',
        updateForm: {},
        btnMessage: "Success",
        imageFile: {},
        checkBox: false,
        checked: {},
        previewWindow: false,
        update: this.props.update
    }
    componentDidMount() {
        if (this.props.updateHandler) {
            this.inputUpdateHandler(this.props.updateData);
            this.setState({ updateForm: this.props.updateData })
        } else {
            this.resetForm()
        }
    }
    handleImageAsFile = (imageList) => {
        this.setState({ imageFile: imageList })
    };
    handleChangeChk = (event, index) => {
        this.setState(previousState => ({
            checked: {
                ...previousState.checked,
                [index]: !previousState.checked[index]
            }
        }));
    }
    submitPost = (event) => {
        if (!this.props.loading && !this.props.animate) {
            event.preventDefault();
            let formData = {};
            if (!this.props.updateHandler) {
                for (let formElementIdentifier in this.state.orderForm) {
                    if (this.state.orderForm[formElementIdentifier].startView && this.state.orderForm[formElementIdentifier].value !== '') {
                        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
                    } else if (!this.state.orderForm[formElementIdentifier].startView && this.state.orderForm[formElementIdentifier].value !== '') {
                        formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
                        this.props.Przepisy ? formData.Przepisy = this.props.Przepisy : null;

                    }
                }
                formData['imageFile'] = this.state.imageFile;
                let postKey = !this.props.updateHandler ? new Date().getTime() : this.props.updateData.key;
                postKey.toString();
                formData['key'] = postKey;
                formData['date'] = `${new Date().getFullYear()}-${new Date().getMonth()}-${new Date().getDate()}  ${new Date().getHours()}:${new Date().getMinutes()}`;
            } else {
                formData = this.state.updateForm;
                formData['imageFile'] = this.state.imageFile;
            }
            this.props.onFetchNewPost(formData, this.props.updateHandler, this.props.folderName)
        } else this.resetForm();
        this.props.onAnimateSuccesErrorButton();
    }
    resetForm = () => {
        const oldState = {
            przygotowanie: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Przepis'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                startView: true,
                hide: true
            },
            photographs: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Photographs'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                startView: true,
                hide: true
            },
            location: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Location'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                startView: true,
                hide: true
            },
            describeData: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Describe'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                startView: false,
                hide: true
            },
            webAddress: {
                elementType: 'input',
                elementConfig: {
                    type: 'url',
                    placeholder: 'URL',
                    hide: true
                },
                value: '',
                validation: {
                    required: true
                },
                valid: true,
                touched: true,
                startView: false,
                hide: true
            },
            textField: {
                // <textarea placeholder="Remember, be nice!" cols="30" rows="5"></textarea>
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your text'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                startView: false,
                hide: true
            },
            skladniki: {
                // <textarea placeholder="Remember, be nice!" cols="30" rows="5"></textarea>
                elementType: 'textarea',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Składniki'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                startView: false,
                hide: true
            },
            year: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Year'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4,
                    maxLength: 4,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                startView: true,
                hide: true
            },
            price: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    step: 0.01,
                    placeholder: 'Cena'
                },
                value: '',
                validation: {
                    required: true,
                    // minLength: 4,
                    // maxLength: 4,
                    step: 0.01,
                    isNumeric: true
                },
                valid: false,
                touched: false,
                startView: true,
                hide: true
            }
        }
        this.setState({ orderForm: oldState });
    }
    inputUpdateHandler = (postData) => {
        let updatedFormElement = {};
        for (let key in this.state.orderForm) {
            updatedFormElement[key] = updateObject(this.state.orderForm[key], {
                value: postData[key],
                elementConfig: {
                    type: key === "year" ? 'number' : 'text',
                    placeholder: this.state.orderForm[key].elementConfig.placeholder
                },
                valid: true,
                touched: true
            });
        }
        this.setState({ orderForm: updatedFormElement });
    }
    inputChangedHandler = (event, inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            value: (!this.props.loading && this.props.animate) || (event.target.value === 'on') ? '' : event.target.value,
            valid: !this.props.loading && this.props.animate ? false : checkValidity(event.target.value, this.state.orderForm[inputIdentifier].validation),
            touched: !this.props.loading && this.props.animate ? false : true,
        });
        let updateList = this.state.updateForm;
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });

        let formIsValid = true;

        if (!this.props.field) {
            for (let inputIdentifier in updatedOrderForm) {
                if (this.state.orderForm[inputIdentifier].startView) {
                    formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
                    // this.props.updateHandler ? updateList[inputIdentifier] = updatedOrderForm[inputIdentifier].value : null;
                }
            }
        } else {
            this.props.field.split(' ').map(res => {
                return formIsValid = updatedOrderForm[res].valid && formIsValid;
                // this.props.updateHandler ? updateList[inputIdentifier] = updatedOrderForm[inputIdentifier].value : null;
            })
        }
        if (this.props.updateHandler) {
            updateList[inputIdentifier] = updatedOrderForm[inputIdentifier].value
        }
        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid,
            updateForm: updateList
        });
    }
    inputChanged = (inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier], {
            hide: !this.state.orderForm[inputIdentifier].hide,
            valid: !this.state.orderForm[inputIdentifier].valid
        });
        const updatedOrderForm = updateObject(this.state.orderForm, {
            [inputIdentifier]: updatedFormElement
        });
        let formIsValid = true;
        if (!this.props.field) {
            for (let inputIdentifier in updatedOrderForm) {
                if (this.state.orderForm[inputIdentifier].startView && this.state.orderForm[inputIdentifier].touched) {
                    formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
                }
            }
        } else {
            this.props.field.split(' ').map(res => {
                return formIsValid = updatedOrderForm[res].valid && formIsValid;
            });
        }
        return this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid
        })
    }
    render() {
        const formElementsArray = [];
        if (this.props.Przepisy !== true) {
            for (let key in this.state.orderForm) {
                if (this.state.orderForm[key].startView) {
                    formElementsArray.push({
                        id: key,
                        config: this.state.orderForm[key]
                    });
                }
            }
        } else {
            this.props.field.split(' ').map(res => {
                return formElementsArray.push({
                    id: res,
                    config: this.state.orderForm[res]
                });
            })
        }
        let animationButton;
        let hidePostForm = "Show";
        if (!this.props.loading && !this.props.animate) {
            animationButton = <ButtonBootstrap
                variant="outline-dark"
                onClick={this.submitPost}
                disabled={!this.state.formIsValid}>
                {this.state.formIsValid ? "Add Post" : "Fill all field!"}</ButtonBootstrap>
            if (this.state.btnMessage === "Do it again?") {
                this.setState({ btnMessage: "Success" });
            }
        } else if (!this.props.loading && this.props.animate) {
            hidePostForm = "Hide";
            setTimeout(() => {
                this.setState({ btnMessage: "Do it again?" })
            }, 1000);
            animationButton = <div> <ButtonBootstrap
                variant="success"
                onClick={() => this.submitPost()}>{this.state.btnMessage}</ButtonBootstrap>
                <Button
                    btnType="Success" /></div>
        } else { animationButton = <label className={classes.Loading}><PropagateLoader /></label> }
        let lengthInput = formElementsArray.length;
        let form = (
            <form onSubmit={this.submitPost} >
                <div className={classes[hidePostForm]}>
                    {formElementsArray.map(formElement => (
                        < div >
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                disabled={this.state.orderForm.disabled}
                                value={formElement.config.value}
                                invalid={!formElement.config.valid}
                                shouldValidate={formElement.config.validation}
                                touched={formElement.config.touched}
                                hide={lengthInput >= 1 ? formElement.config.hide : 'none'}
                                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                clicked={() => this.inputChanged(formElement.id)}
                            />
                        </div>
                    ))}
                </div>
                <Button
                    btnState={hidePostForm + 'PostForm'}
                    btnType="Success"

                />
                <div className={classes.SubmitBtn}>
                    {animationButton}
                </div>
                <ImageUploading
                    onChange={this.handleImageAsFile}
                    maxNumber={maxNumber}
                    multiple
                    maxFileSize={maxMbFileSize}
                    acceptType={["jpg", "gif", "png"]} >
                    {({ imageList, onImageUpload, onImageRemoveAll }) => (
                        // write your building UI
                        <div className={classes.ImgDivWraper}>
                            <div className={classes.BtnWraper}>
                                <ButtonBootstrap variant="outline-primary" onClick={onImageUpload}>Upload images</ButtonBootstrap>{' '}
                                <ButtonBootstrap variant="outline-danger" onClick={onImageRemoveAll}>Remove all images</ButtonBootstrap>{' '}
                                {imageList.length !== 0 ? <ButtonBootstrap variant="info" onClick={() => { this.setState({ previewWindow: false }) }}>You have: {imageList.length} images </ButtonBootstrap> : null}
                            </div>
                            {imageList.length !== 0 && this.state.previewWindow === false ?
                                <div className={classes.PreloaderWraper}>
                                    {imageList.map((image, index) => (
                                        < div key={image.key}
                                            className={classes.ImgDiv}>
                                            <img src={image.dataURL} alt="not found" />
                                            <input
                                                ref={ref => this.fileInput = ref}
                                                key={index}
                                                type="checkbox"
                                                name={image.file.name}
                                                value={image.dataURL}
                                                checked={checked[index] || false}
                                                disabled={!checked[index] && disabled}
                                                onChange={(event) => this.handleChangeChk(event, index)}
                                            />
                                            <ButtonBootstrap variant="outline-info" onClick={image.onUpdate}>
                                                <svg className="bi bi-arrow-clockwise" width="0.9em" height="0.9em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path fillRule="evenodd" d="M3.17 6.706a5 5 0 0 1 7.103-3.16.5.5 0 1 0 .454-.892A6 6 0 1 0 13.455 5.5a.5.5 0 0 0-.91.417 5 5 0 1 1-9.375.789z" />
                                                    <path fillRule="evenodd" d="M8.147.146a.5.5 0 0 1 .707 0l2.5 2.5a.5.5 0 0 1 0 .708l-2.5 2.5a.5.5 0 1 1-.707-.708L10.293 3 8.147.854a.5.5 0 0 1 0-.708z" />
                                                </svg>
                                            </ButtonBootstrap>

                                            <ButtonBootstrap variant="outline-danger" onClick={image.onRemove}>
                                                <svg className="bi bi-trash" width="0.8em" height="0.8em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                </svg>

                                            </ButtonBootstrap>
                                        </div>
                                    ))}
                                    <div className={[classes['BtnWraper', 'PreviewWindowBtn']].join(' ')}>
                                        <ButtonBootstrap variant="outline-primary" onClick={onImageUpload}>Add</ButtonBootstrap>
                                        <ButtonBootstrap variant="success" onClick={() => { this.setState({ previewWindow: true }) }}>Done</ButtonBootstrap></div>
                                </div> : null}
                        </div>
                    )}
                </ImageUploading>
            </form>
        );

        const { checked } = this.state;
        const checkedCount = Object.keys(checked).filter(key => checked[key]).length;
        const disabled = checkedCount > 0;
        let year = [];
        for (let i = 1960; i <= 2060; i++) {
            year.push(<option key={i} value={i}>{i}</option>);
        }
        return (

            <div className={[classes.NewPost, classes[this.props.classType]].join(' ')}>
                {form}
            </div >
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.newpost.loading,
        animate: state.newpost.animate,
        updateData: state.newpost.updateData,
        updateHandler: state.newpost.updateHandler
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchNewPost: (formData, isUpdate, folderName) => dispatch(actions.addNewPost(formData, isUpdate, folderName)),
        //onFetchNewPost: (formData, isUpdate) => dispatch(actions.addNewPost(formData, isUpdate)),
        onAnimateSuccesErrorButton: () => dispatch(actions.animateSuccesErrorButton()),
        onUpdatePostData: () => dispatch(actions.updatePostData())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(NewPost);