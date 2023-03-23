<?php

$enJson = json_decode(file_get_contents($argv[1]), true);
$jaJson = json_decode(file_get_contents($argv[2]), true);

foreach ($enJson as $index => $value) {
    if ($index === 0 || $index) {
        $enJson[$index]['keywords'] = array_values(array_unique(array_merge($enJson[$index]['keywords'] ?? [], $jaJson[$index]['keywords'] ?? [])));
    }
}

$data = json_encode($enJson, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);

file_put_contents('./emojilist_merged.json', $data);
