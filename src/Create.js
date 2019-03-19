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
            discount: '',
            availability: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange({ target }) {
        this.setState({ [target.name]: target.value }, () => console.log(this.state))
    }
    handleSubmit(ev) {
        const hasDiscount = this.state.discount;
        ev.preventDefault()

        if (hasDiscount) {
            this.props.onSave(this.state)
                .then(() => this.props.history.push('/products/sales'))
        }
        else {
            this.props.onSave(this.state)
                .then(() => this.props.history.push('/products'))
        }
    }
    render() {
    const { fields } = this.state;
    
    const disabled = this.state.name.length === 0 || this.state.price === '' || this.state.discount === '' || this.state.availability.length === 0;
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
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