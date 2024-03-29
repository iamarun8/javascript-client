import React from 'react';
import * as yup from 'yup';
import { TextField } from '../../components'
import { ButtonField } from '../../components/Button';
import RadioButton from '../../components/RadioGroup/RadioButton';
import { SelectField } from '../../components/SelectField'
import { Cric, Foot, selectitem } from '../../configs/constants'

class InputDemo extends React.Component {
    schema = yup.object().shape({
        name: yup.string().required('Name is a required field').min(3),
        sport: yup.string().required('Sport is a required field'),
        cricket: yup.string().when('sport', { is: 'cricket', then: yup.string().required('What you do is a required field') }),
        football: yup.string().when('sport', { is: 'football', then: yup.string().required('What you do is a required field') }),
    });

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            sport: '',
            cricket: '',
            football: '',
            touched: {
                name: false,
                sport: false,
                cricket: false,
                football: false,
            },
        };
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value }, () => {
            console.log(this.state);
        });
    }

    handleSportChange = (e) => {
        this.setState({ sport: e.target.value }, () => console.log(this.state));
        if (e.target.value === 'Select') {
            this.setState({ sport: '' });
        }
        return e.target.value === 'cricket' ? this.setState({ football: '' }) : this.setState({ cricket: '' });
    }

    handlePositionChange = (e) => {
        const { sport } = this.state;
        return sport === 'cricket' ? this.setState({ cricket: e.target.value }, () => console.log(this.state)) : this.setState({ football: e.target.value }, () => console.log(this.state));
    }

    RadioOption = () => {
        let { radioValue } = this.state;
        const { sport } = this.state;
        if (sport === 'cricket') {
            radioValue = Cric;
        } else if (sport === 'football') {
            radioValue = Foot;
        }
        return (radioValue);
    };

    getError = (field) => {
        const { touched } = this.state;
        if (touched[field] && this.hasErrors()) {
            try {
                this.schema.validateSyncAt(field, this.state);
            } catch (err) {
                return err.message;
            }
        }
        return ''
    };

    hasErrors = () => {
        try {
            this.schema.validateSync(this.state);
        } catch (err) {
            return true;
        }
        return false;
    }

    isTouched = (field) => {
        const { touched } = this.state;
        this.setState({
            touched: {
                ...touched,
                [field]: true,
            },
        });
    }

    render() {
        const { sport } = this.state;
        return (
            <>
                <div>
                    <p><b>Name:</b></p>
                    <TextField
                        error={this.getError('name')}
                        onChange={(event)=>this.handleNameChange}
                        onBlur={() => this.isTouched('name')}
                    />
                    <p><b>Select the game you play?</b></p>
                    <SelectField
                        defaultText="Select"
                        onChange={this.handleSportChange}
                        options={selectitem}
                        error={this.getError('sport')}
                        onBlur={() => this.isTouched('sport')}
                    />
                    <div>
                        {
                            (sport === '' || sport === 'Select') ? ''
                                : (
                                    <>
                                        <p><b>What you do?</b></p>
                                        <RadioButton
                                            options={this.RadioOption()}
                                            onChange={this.handlePositionChange}
                                            error={this.getError(sport)}
                                            onBlur={() => this.isTouched(sport)}
                                        />
                                    </>
                                )
                        }
                    </div>
                    <div>
                        <ButtonField value="Cancel" onClick={()=>{}} />
                        <ButtonField value="Submit" disabled={this.hasErrors()} onClick={()=>{}} />
                    </div>
                </div>
            </>
        );
    }
}

export default InputDemo