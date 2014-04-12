<?php

/*$id = $_GET['id'];
$data = array('status'=>'error');
if ($id) {



	$data = array(
		'status'=>'ok',
		'projects'=>array()
	);
}*/

function removeDotsFolders ($list) {

	$res = array();
	foreach ($list as $key => $value) {
		if ($value != '.' && $value != '..') {
			$res[] = $value;
		}
	}

	return $res;
}

function getXMLdata ($path) {

	$xml = simplexml_load_file($path);

	foreach ($xml as $key => $value) {

		if ($key == 'types') {
			foreach ($value->type as $key2 => $value2) {
				$result['type'][] = array('name'=>"{$value2}");
			}
		} else {
			$result[$key] = "{$value}";
		}
	}

	return $result;
}



$REQUEST_URI = 'http://localhost/antoniaskaraki.com/';
$path_root = 'portfolio/';
$root = '../'.$path_root;

$folder = removeDotsFolders(scandir($root));

foreach ($folder as $key => $value) {

	$project[$key] = array();
	$project[$key]['id'] = $value;
	$project_photos = scandir($root.$value.'/photo/');
	$project[$key]['photos'] = removeDotsFolders($project_photos);


	foreach ($project[$key]['photos'] as $key2 => $value2) {
		$project[$key]['photos'][$key2] = array('path'=>$value2);
	}



	$project[$key]['photo_path'] = $path_root.$value.'/photo/';

	$project_videos = scandir($root.$value.'/video/');
	$project[$key]['videos'] = removeDotsFolders($project_videos);
	$project[$key]['video_path'] = $path_root.$value.'/video/';


	$content = file_get_contents($root.$value.'/page.html');
	if (!$content) {
		$content = false;
	}
	$project[$key]['content'] = $content;

	$name = file_get_contents($root.$value.'/name.txt');
	if (!$name) {
		$name = false;
	}

	$metadata = getXMLdata($root.$value.'/data.xml');

	$project[$key]['name'] = $metadata['name'];
	$project[$key]['category_el'] = $metadata['category_el'];
	$project[$key]['category_en'] = $metadata['category_en'];
	$project[$key]['description_el'] = $metadata['description_el'];
	$project[$key]['description_en'] = $metadata['description_en'];
	$project[$key]['action_el'] = $metadata['action_el'];
	$project[$key]['action_en'] = $metadata['action_en'];

	$project[$key]['type'] = $metadata['type'];
}

//print_r($project);


echo json_encode($project);
die();
?>