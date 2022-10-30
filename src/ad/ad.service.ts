import { Injectable } from '@nestjs/common';
import { Request } from 'express';

import { EnvService } from '@/config/env/env.service';
import { AdSourcesEnum, getIndexOfAdSources } from '@/ad/enums/ad-sources.enum';
import { AD_CAMPAIGN, AD_CAMPAIGN_STG, AD_SOURCE, AD_SOURCE_STG } from '@/ad/ad.constant';

@Injectable()
export class AdService {
  constructor(private envService: EnvService) {}

  getAdSourceId(req: Request): number | undefined {

    const adSourceKey = 'true' === this.envService.isStaging ? AD_SOURCE_STG : AD_SOURCE;
    const adSource = req.cookies[adSourceKey] as AdSourcesEnum;

    return getIndexOfAdSources(adSource);
  }

  getAdCampaign(req: Request): string | undefined {

    const adCampaignKey = 'true' === this.envService.isStaging ? AD_CAMPAIGN_STG : AD_CAMPAIGN;
    const adCampaign = req.cookies[adCampaignKey] as string | undefined;

    return adCampaign;
  }
}