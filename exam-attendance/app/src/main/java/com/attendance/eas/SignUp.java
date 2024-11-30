package com.attendance.eas;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class SignUp extends AppCompatActivity {

    EditText email, username, department, course, password, repassword;
    TextView signUp;

    DatabaseHelper db;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_sign_up);

        db=new DatabaseHelper(this);

        email=findViewById(R.id.et_email);
        username=findViewById(R.id.et_username);
        department=findViewById(R.id.et_department);
        course=findViewById(R.id.et_course_code);
        password=findViewById(R.id.et_password);
        repassword=findViewById(R.id.et_confirm_password);
        signUp=findViewById(R.id.btn_signup);
        TextView warning=findViewById(R.id.warning);

        signUp.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {


                if(email.getText().toString().equals("")){
                    email.setError("Email cannot be empty");
                }
                if(username.getText().toString().equals("")){
                    username.setError("Username cannot be empty");
                }

                if(department.getText().toString().equals("")){
                    department.setError("Department cannot be empty");
                }

                if(course.getText().toString().equals("")){
                    course.setError("Course cannot be empty");
                }

                if(password.getText().toString().equals("")){
                    password.setError("Password cannot be empty");
                }

                if(repassword.getText().toString().equals("")){
                    repassword.setError("Password cannot be empty");
                }

                if(!email.getText().toString().equals("") && !username.getText().toString().equals("") && !department.getText().toString().equals("") && !course.getText().toString().equals("") && !password.getText().toString().equals("") && !repassword.getText().toString().equals("")){

                    if(password.getText().toString().equals(repassword.getText().toString())){
                        boolean insert=db.insertUser(email.getText().toString(), username.getText().toString(), department.getText().toString(), course.getText().toString(), password.getText().toString());

                        if(insert==true){
                            email.setText("");
                            username.setText("");
                            department.setText("");
                            course.setText("");
                            password.setText("");
                            repassword.setText("");

                            Toast.makeText(SignUp.this, "Sign Up Successful", Toast.LENGTH_SHORT).show();
                            Intent intent=new Intent(getApplicationContext(), LogIn.class);
                            startActivity(intent);
                        }else {
                            Toast.makeText(SignUp.this, "Sign Up Failed", Toast.LENGTH_SHORT).show();
                        }
                    }else{
                        warning.setVisibility(View.VISIBLE);
                        warning.setText("password mismatch");
                    }


                }else {
                    warning.setVisibility(View.VISIBLE);
                }
            }
        });


    }
}