import React, { Component } from 'react';
import Field from './Field';

export default class Create extends Component {
    constructor() {
        super()
        this.state = {
            fields: [
                'name',
                'price',
                'discount',
                'availability'
            ],
            name: '',
            price: '',
            discount: undefined,
            availability: '',
            error: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange({ target }) {
        this.setState({ [target.name]: target.value }, () => console.log(this.state))
    }
    handleSubmit(ev) {
        console.log(ev)
        const hasDiscount = this.state.discount;
        ev.preventDefault()

        if (hasDiscount) {
            this.props.onSave(this.state)
                .then(() => this.props.history.push('/products/sales'))
                .catch((ex) => {
                    if (hasDiscount > 100) {
                        this.setState({ error: `Validation max on discount failed`})
                    }
                    else {
                        this.setState({ error: 'name must be unique'});
                    }
                });
        }
        else {
            this.props.onSave(this.state)
                .then(() => this.props.history.push('/products'))
                .catch(ex => this.setState({ error: 'name must be unique'}));
        }
    }
    render() {
    const { fields, error } = this.state;
    
    const disabled = this.state.name.length === 0 || this.state.price === '';
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    {
                        error && (
                            <li className="alert alert-danger">{ error }</li>
                        )
                    }
                        {
                            fields.map( (field) => {
                                return (
                                    <Field
                                        key={field}
                                        label={field}
                                        controlledValue={this.state[field]}
                                        handleChange={this.handleChange}
                                    />
                                )
                            })
                        }
                    <button className="btn btn-primary" disabled={disabled}> Create </button>
                </form>
            </div>
        )
    }
}