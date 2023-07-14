package com.prototype.app_springboot.controller;

import com.prototype.app_springboot.config.jwt.TokenProvider;
import com.prototype.app_springboot.data.dto.request.LoginRequestDto;
import com.prototype.app_springboot.data.dto.request.RefreshTokenRequestDto;
import com.prototype.app_springboot.data.dto.request.SignUpRequestDto;
import com.prototype.app_springboot.data.dto.response.TokenResponseDto;
import com.prototype.app_springboot.data.entity.UserInfo;
import com.prototype.app_springboot.data.type.SocialType;
import com.prototype.app_springboot.data.type.SystemRoleType;
import com.prototype.app_springboot.service.AuthService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.security.SignatureException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Slf4j
public class AuthController {

    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AuthService authService;
    private final TokenProvider tokenProvider;

    private final AuthenticationManager authenticationManager;

    public AuthController(BCryptPasswordEncoder bCryptPasswordEncoder, AuthService authService, TokenProvider tokenProvider, AuthenticationManager authenticationManager) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.authService = authService;
        this.tokenProvider = tokenProvider;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/auth/signUp")
    public ResponseEntity<String> signUp(@RequestBody SignUpRequestDto signUpRequestDto) {
        String encPassword = bCryptPasswordEncoder.encode(signUpRequestDto.getPassword());
        UserInfo user = UserInfo.builder()
                .username(signUpRequestDto.getUsername())
                .password(encPassword)
                .nickname(signUpRequestDto.getNickname())
                .email(signUpRequestDto.getEmail())
                .role(SystemRoleType.USER)
                .social(SocialType.NONE)
                .build();

        authService.join(user);

        return new ResponseEntity<>("회원가입 완료", HttpStatus.OK);
    }


    /**
     * 로그인 요청을 받는 controller
     * 로그인 요청을 받으면 UsernamePasswordAuthenticationToken로 검증을 실행하고
     * SecurityContextHolder에 authentication을 저장 -> TokenProvider 클래스에서 토큰 생성시 저장된 정보를 claim에 담을 때 사용
     *
     * @param loginRequestDto
     * @return TokenResponseDto
     */
    @PostMapping("/auth/signIn")
    public ResponseEntity<?> login(@RequestBody LoginRequestDto loginRequestDto) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(loginRequestDto.getUsername(), loginRequestDto.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            return new ResponseEntity<TokenResponseDto>(authService.generateTokens(authentication), HttpStatus.OK);
        } catch (BadCredentialsException e) {
            return new ResponseEntity<String>("잘못된 아이디 혹은 비밀번호 입니다.", HttpStatus.UNAUTHORIZED);
        }
    }


    /**
     * refresh 토큰을 통해서 Access 토큰과 refresh 토큰을 재발급 받음.
     *
     * @param refreshTokenRequestDto
     * @return
     */
    @PostMapping("/auth/refreshToken")
    public ResponseEntity<?> regenerateToken(@RequestBody RefreshTokenRequestDto refreshTokenRequestDto) {
        String msg = null;
        try {
            boolean isTokenValid = tokenProvider.validateToken(refreshTokenRequestDto.getRefreshToken());

            // 토큰 유효성 검사
            if (isTokenValid) {
                String username = tokenProvider.getUsernameByToken(refreshTokenRequestDto.getRefreshToken());

                // 저장된 refresh 토큰과 사용자가 request 시 보낸 토큰과 일치하는지 확인
                if (!authService.getSavedRefreshToken(username).equals(refreshTokenRequestDto.getRefreshToken())) {
                    return new ResponseEntity<String>("잘못된 refresh 토큰입니다.", HttpStatus.UNAUTHORIZED);
                }

                Authentication authentication = authenticationManager.authenticate(
                        new UsernamePasswordAuthenticationToken(username, "")
                );

                return new ResponseEntity<TokenResponseDto>(authService.generateTokens(authentication), HttpStatus.OK);
            }
        } catch (JwtException exception) {
            // JwtException 종류에 따라 로그를 출력
            if (exception instanceof SignatureException) {
                msg = "잘못된 토큰 서명 방식 입니다.";
                log.error(msg);
            } else if (exception instanceof ExpiredJwtException) {
                msg = "만료된 토큰입니다.";
                log.error(msg);
            } else {
                msg = "토큰 검증이 실패했습니다.";
                log.error(msg);
            }
        }
        return new ResponseEntity<String>(msg, HttpStatus.UNAUTHORIZED);
    }
}
