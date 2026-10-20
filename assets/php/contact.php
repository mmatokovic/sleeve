<?php

$address = 'me@mmatokovic.dev';

$prefix = 'Website feedback';


$error = false;
$success = false;

if ((bool) filter_var(trim($address), FILTER_VALIDATE_EMAIL)) {
  $to = $sender = trim($address);
}
else {
  $error = true;
}

if (!isset($_SERVER['HTTP_REFERER']) || (parse_url($_SERVER['HTTP_REFERER'], PHP_URL_HOST) != $_SERVER['SERVER_NAME'])) {
  exit('Direct access not permitted');
}

if ($_SERVER['REQUEST_METHOD'] != 'POST' || empty($_POST)) {
  $error = true;
}

if (!empty($_POST['url'])) {
  $error = true;
}

if ((bool) filter_var(trim($_POST['email']), FILTER_VALIDATE_EMAIL)) {
  $email = trim($_POST['email']);
}
else {
  $error = true;
}

if (!$error) {
  $name = _contact_clean_str($_POST['name'], ENT_QUOTES, true, true);
  $prefix = _contact_clean_str($prefix, ENT_NOQUOTES, true, true);
  $subject = _contact_clean_str($_POST['subject'], ENT_NOQUOTES, true, true);
  $subject = "[$prefix] $subject";
  $message = _contact_clean_str($_POST['message'], ENT_NOQUOTES);
  $lines = explode("\n", $message);
  array_walk($lines, '_contact_ff_wrap');
  $message = implode("\n", $lines);
  $headers = [
    'From'                      => "$name <$email>",
    'Sender'                    => $sender,
    'Return-Path'               => $sender,
    'MIME-Version'              => '1.0',
    'Content-Type'              => 'text/plain; charset=UTF-8; format=flowed; delsp=yes',
    'Content-Transfer-Encoding' => '8Bit',
    'X-Mailer'                  => 'Hugo - Zen',
  ];
  $mime_headers = [];
  foreach ($headers as $key => $value) {
    $mime_headers[] = "$key: $value";
  }
  $mail_headers = join("\n", $mime_headers);

  $success = @mail($to, $subject, $message, $mail_headers, '-f' . $sender);
}

$status = $success ? 'submitted' : 'error';
$contact_form_url = strtok($_SERVER['HTTP_REFERER'], '?');

header('Location: ' . $contact_form_url . '?' . $status, TRUE, 302);
exit;

function _contact_ff_wrap(&$line) {
  $line = wordwrap($line, 72, "  \n");
}

function _contact_clean_str($str, $quotes, $strip = false, $encode = false) {
  if ($strip) {
    $str = strip_tags($str);
  }

  $str = htmlspecialchars(trim($str), $quotes, 'UTF-8');

  if ($encode && preg_match('/[^\x20-\x7E]/', $str)) {
    $str = '=?UTF-8?B?' . base64_encode($str) . '?=';
  }

  return $str;
}