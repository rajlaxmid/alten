import React from 'react';


const User = (props) => {
	const user = props.user.user;
	return(
		<div>
		 {Object.keys(props.user.user).length}
			<p>{user.userName}</p>
			<p>{user.userAddress}</p>
			<p>{user.userPhone}</p>
		</div>
	)
}

export default User;