import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';

@Injectable()
export class RecaptchaService {
  private client: RecaptchaEnterpriseServiceClient;
  private projectID: string;
  private recaptchaKey: string;

  constructor(private configService: ConfigService) {
    this.projectID =
      this.configService.get<string>('RECAPTCHA_PROJECT_ID') || '';
    this.recaptchaKey =
      this.configService.get<string>('RECAPTCHA_SITE_KEY') || '';
    this.client = new RecaptchaEnterpriseServiceClient({
      credentials: {
        client_email: this.configService.get<string>('GCP_CLIENT_EMAIL'),
        private_key: this.configService
          .get<string>('GCP_PRIVATE_KEY')
          ?.replace(/\\n/g, '\n'),
      },
    });
  }

  async verifyToken(
    token: string,
    recaptchaAction: string,
  ): Promise<number | null> {
    try {
      const projectPath = this.client.projectPath(this.projectID);

      const request = {
        assessment: {
          event: {
            token: token,
            siteKey: this.recaptchaKey,
          },
        },
        parent: projectPath,
      };

      const [response] = await this.client.createAssessment(request);

      if (!response.tokenProperties || !response.tokenProperties.valid) {
        const invalidReason =
          response.tokenProperties?.invalidReason || 'Unknown reason';
        console.log(`Token is invalid: ${invalidReason}`);
        return null;
      }

      if (response.tokenProperties.action === recaptchaAction) {
        if (response.riskAnalysis) {
          console.log(`Assessment reCAPTCHA: ${response.riskAnalysis.score}`);
        } else {
          console.log('Risk analysis is null or undefined.');
        }

        if (
          response.riskAnalysis &&
          response.riskAnalysis.reasons &&
          response.riskAnalysis.reasons.length > 0
        ) {
          response.riskAnalysis.reasons.forEach((reason) => {
            console.log(`Reason: ${reason}`);
          });
        }

        return response.riskAnalysis &&
          response.riskAnalysis.score !== undefined
          ? response.riskAnalysis.score
          : null;
      } else {
        console.log(
          'The action attribute in the token does not match the expected action',
        );
        return null;
      }
    } catch (error) {
      console.error('Error verifying reCAPTCHA:', error);
      throw error;
    }
  }
}
