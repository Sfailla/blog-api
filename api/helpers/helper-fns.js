const hexColorArray = [
	'FF00FF',
	'F5511E',
	'7A1FA2',
	'004C3F',
	'0288D1',
	'465A65',
	'00887A',
	'33691E'
]

const getRandomHexColor = () => {
	const randomIndex = Math.floor(Math.random() * hexColorArray.length)
	return hexColorArray[randomIndex]
}

module.exports = {
	getRandomHexColor
}
