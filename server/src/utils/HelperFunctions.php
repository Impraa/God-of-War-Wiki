<?php

namespace App\utils;

use Symfony\Component\HttpFoundation\Request;

trait HelperFunctions
{
    public function transformData(Request $request): array
    {
        $content = $request->getContent();

        $explodedContent = explode("\r\n", $content);

        $values = [];

        foreach ($explodedContent as $index => $line) {
            if (strpos($line, 'Content-Disposition: form-data;') !== false) {
                $fieldName = explode('name="', $line)[1];
                $fieldName = rtrim($fieldName, '"');
                $value = $explodedContent[$index + 2];
                $values[$fieldName] = $value;
            }
        }

        return $values;
    }
}