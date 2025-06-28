import { testUser } from './e2e/auth/auth.helper';

const EMULATOR_AUTH_URL =
  'http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAkiKZ9XJK3i6ePBYD4rLA9TpEe0pmSvac';
const EMULATOR_UPDATE_URL =
  'http://localhost:9099/identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAkiKZ9XJK3i6ePBYD4rLA9TpEe0pmSvac';

export default async function globalSetup() {
  const signupResponse = await fetch(EMULATOR_AUTH_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: testUser.email,
      password: testUser.password,
      returnSecureToken: true,
    }),
  });

  const signupData = await signupResponse.json();

  if (!signupResponse.ok) {
    if (signupData?.error?.message === 'EMAIL_EXISTS') {
      console.log('⚠️ Test user already exists');
      return;
    } else {
      console.error('❌ Error creating test user:', signupData.error?.message);
      throw new Error(signupData.error?.message || 'Unknown error');
    }
  }

  const idToken = signupData.idToken;

  const updateResponse = await fetch(EMULATOR_UPDATE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      idToken,
      displayName: testUser.username,
      returnSecureToken: false,
    }),
  });

  if (!updateResponse.ok) {
    const updateData = await updateResponse.json();
    console.error('❌ Error updating displayName:', updateData.error?.message);
    throw new Error(updateData.error?.message || 'Unknown update error');
  }

  console.log(
    '✅ Test user created and displayName updated in Firebase Auth Emulator'
  );
}
