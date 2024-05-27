// export const animeDataFragment = `fragment AnimeData on Media {
// 	id
// 	idMal
// 	title {
// 		english
// 		romaji
// 		native
// 	}
// 	coverImage {
// 		extraLarge
// 		large
// 		medium
// 		color
// 	}
// 	bannerImage
// 	type
// 	episodes
// 	status
// 	description
// 	startDate {
// 		day
// 		month
// 		year
// 	}
// 	endDate {
// 		day
// 		month
// 		year
// 	}
// }`;

export const animeDataFragment = `id
idMal
title {
	english
	romaji
	native
}
coverImage {
	extraLarge
	large
	medium
	color
}
bannerImage
type
episodes
status
description(asHtml: false)
startDate {
	day
	month
	year
}
endDate {
	day
	month
	year
}`;
