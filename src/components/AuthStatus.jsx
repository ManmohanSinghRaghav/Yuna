import { useState, useEffect } from 'react';
import { onAuthChange, signInUser, createUser, signInAnonymous, signOutUser } from '../services/authService.js';
import './AuthStatus.css';

function AuthStatus() {
  const [authState, setAuthState] = useState({ loading: true, user: null });
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('signin'); // 'signin' or 'signup'
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [authError, setAuthError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthChange((state) => {
      setAuthState({ loading: false, user: state.user, isSignedIn: state.isSignedIn });
    });

    return () => unsubscribe();
  }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setAuthError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setAuthError('');

    try {
      let result;
      if (authMode === 'signin') {
        result = await signInUser(formData.email, formData.password);
      } else {
        result = await createUser(formData.email, formData.password);
      }

      if (result.success) {
        setShowAuthModal(false);
        setFormData({ email: '', password: '' });
      } else {
        setAuthError(result.error.message || 'Authentication failed');
      }
    } catch (error) {
      setAuthError('An unexpected error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAnonymousSignIn = async () => {
    setIsSubmitting(true);
    setAuthError('');
    
    const result = await signInAnonymous();
    if (!result.success) {
      setAuthError(result.error.message || 'Anonymous sign-in failed');
    }
    setIsSubmitting(false);
  };

  const handleSignOut = async () => {
    const result = await signOutUser();
    if (!result.success) {
      setAuthError('Sign out failed');
    }
  };

  if (authState.loading) {
    return <div className="auth-status">Loading...</div>;
  }

  return (
    <div className="auth-status">
      {authState.isSignedIn ? (
        <div className="user-info">
          <span className="welcome-text">
            Welcome, {authState.user.displayName}
            {authState.user.isAnonymous && ' 👤'}
          </span>
          <button onClick={handleSignOut} className="sign-out-btn">
            Sign Out
          </button>
        </div>
      ) : (
        <div className="auth-buttons">
          <button onClick={() => setShowAuthModal(true)} className="auth-btn primary">
            Sign In
          </button>
          <button onClick={handleAnonymousSignIn} className="auth-btn secondary" disabled={isSubmitting}>
            {isSubmitting ? 'Signing in...' : 'Continue as Guest'}
          </button>
        </div>
      )}

      {showAuthModal && (
        <div className="modal-overlay" onClick={() => setShowAuthModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{authMode === 'signin' ? 'Sign In' : 'Create Account'}</h3>
              <button onClick={() => setShowAuthModal(false)} className="close-btn">×</button>
            </div>
            
            <form onSubmit={handleSubmit} className="auth-form">
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                />
              </div>
              
              <div className="form-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password (min 6 characters)"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  disabled={isSubmitting}
                  minLength={6}
                />
              </div>

              {authError && <div className="error-message">{authError}</div>}

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
                {isSubmitting ? 'Please wait...' : (authMode === 'signin' ? 'Sign In' : 'Create Account')}
              </button>
            </form>

            <div className="auth-switch">
              {authMode === 'signin' ? (
                <p>
                  Don't have an account?{' '}
                  <button 
                    type="button" 
                    onClick={() => {setAuthMode('signup'); setAuthError('');}} 
                    className="link-btn"
                  >
                    Sign up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button 
                    type="button" 
                    onClick={() => {setAuthMode('signin'); setAuthError('');}} 
                    className="link-btn"
                  >
                    Sign in
                  </button>
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AuthStatus;
