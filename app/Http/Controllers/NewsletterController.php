<?php

namespace App\Http\Controllers;

use App\Models\Newsletter;
use Illuminate\Http\Request;

class NewsletterController extends Controller
{
    public function store(Request $request) {
        try {
            $request->validate([
                "email" => ["required", "email"]
            ]);

            $exists = Newsletter::whereEmail(trim($request->email))->first();

            if($exists) {
                $exists->status = 1;
                $exists->save();

                return redirect()->back()->withErrors(["email" => "البريد الإلكتروني موجود بالفعل."]);
            }

            $newsletter = new Newsletter();
            $newsletter->email = trim($request->email);
            $newsletter->save();

            return redirect()->back()->with(["email" => "شكرًا لاشتراكك في نشرتنا البريدية."]);
        } catch (\Exception $e) {
            return redirect()->back()->withErrors(["email" => "البريد الإلكتروني المُدخل غير صالح."]);
        }
    }
}
