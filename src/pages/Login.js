import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import Loading from '../components/ Loading';

export default class Login extends Component {
  render() {
    const {
      handleChange,
      isButtonDisable,
      onClickButton,
      loading,
      irSearch } = this.props;
    if (irSearch) return <Redirect to="/search" />;
    return loading ? <Loading /> : (
      <div data-testid="page-login" className='contanner-login'>
        <p className='vs'>VS TUNES</p>
        <label htmlFor="login-name-input">
          <input
            type="text"
            id="login-name-input"
            onChange={ handleChange }
            data-testid="login-name-input"
            placeholder="Digite seu nome"
          />
        </label>
        <button
          type="button"
          data-testid="login-submit-button"
          disabled={ isButtonDisable }
          onClick={ onClickButton }
        >
          Entrar
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  handleChange: PropTypes.func.isRequired,
  isButtonDisable: PropTypes.bool.isRequired,
  onClickButton: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  irSearch: PropTypes.bool.isRequired,
};
