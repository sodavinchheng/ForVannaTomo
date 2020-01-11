const JitsiMeet = require('jitsi-meet-wrapper')
// import './jitsiWrapper'

const meet = new JitsiMeet('https://meet.jit.si')
meet.on('ready', () => {
	const conference = meet.join('Test1234', '#meet')
	conference.on('joined', () => {
		console.log('We are in!')
	})
})

// module.exports = meet
