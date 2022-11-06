export default function formatMoney(amount: number | bigint = 0) {
	const options = {
		style: 'currency',
		currency: 'USD',
		minimumFractionDigits: 2,
	}

	// check if its a clean dollar amount
	if (Number(amount) % 100 === 0) {
		options.minimumFractionDigits = 0
	}

	const formatter = Intl.NumberFormat('en-US', options)

	return formatter.format(Number(amount) / 100)
}
